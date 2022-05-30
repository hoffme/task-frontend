type CallBack<P, R> = (params: P) => Promise<R> | R;

class Subscription<V, R = void> {

    private readonly onUnsubscribe: (subscription: this) => void;

    public readonly callback: CallBack<V, R>;
    public readonly order: number;

    constructor(
        callback: CallBack<V, R>,
        order: number,
        onUnsubscribe: (subscription: Subscription<V, R>) => void
    ) {
        this.order = order;
        this.callback = callback;
        this.onUnsubscribe = onUnsubscribe;
    }

    public unsubscribe() {
        this.onUnsubscribe(this);
    }
}

class Event<V, R = void> {

    private readonly _subscriptions = new Set<Subscription<V, R>>();

    public notify(value: V) {
        const subscriptions = Array.from(this._subscriptions.values());
        const ordersListeners = subscriptions.sort((a, b) => {
            return a.order - b.order;
        });

        ordersListeners.forEach(listener => listener.callback(value));
    }

    private subscribe(callback: CallBack<V, R>, order = 0): Subscription<V, R> {
        const subscription = new Subscription(
            callback,
            order,
            sub => { this.unsubscribe(sub) }
        );

        this._subscriptions.add(subscription);

        return subscription;
    }

    private unsubscribe(subscription: Subscription<V, R>) {
        this._subscriptions.delete(subscription);
    }

    public get client() {
        return {
            subscribe: (c: CallBack<V, R>, o = 0) => this.subscribe(c, o),
            unsubscribe: (s: Subscription<V, R>) => this.unsubscribe(s),
        }
    }

}

export default Event;
export type {
    Subscription
}