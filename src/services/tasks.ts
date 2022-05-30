import Fetch from './fetch'

interface Task {
    id: string
    title: string
    completed: boolean
}

interface TaskSearchParams {
    page?: number
    limit?: number
}

interface TaskSearchResult {
    items: Task[]
    page: number
    limit: number
    total: number
    pages: number
}

interface TaskCreateParams {
    title: string
    completed: boolean
}

interface TaskUpdateParams {
    id: string
    title?: string
    completed?: boolean
}

class TasksService {

    private static readonly uri: string = '/tasks';

    public static async Find(id: string): Promise<Task | undefined> {
        const response = await Fetch.fetch<void, Task | undefined>({
            uri: `${TasksService.uri}/${id}`
        });

        return Fetch.resolveResponse(response);
    }

    public static async Search(params: TaskSearchParams): Promise<TaskSearchResult> {
        const response = await Fetch.fetch<TaskSearchParams, TaskSearchResult>({
            uri: `${TasksService.uri}/search`,
            method: 'POST',
            body: params
        });

        return Fetch.resolveResponse(response);
    }

    public static async Create(params: TaskCreateParams): Promise<Task> {
        const response = await Fetch.fetch<TaskCreateParams, Task>({
            uri: `${TasksService.uri}`,
            method: 'POST',
            body: params
        });

        return Fetch.resolveResponse(response);
    }

    public static async Update(params: TaskUpdateParams): Promise<Task> {
        const response = await Fetch.fetch<TaskUpdateParams, Task>({
            uri: `${TasksService.uri}/${params.id}`,
            method: 'PUT',
            body: params
        });

        return Fetch.resolveResponse(response);
    }

    public static async Delete(id: string): Promise<boolean> {
        const response = await Fetch.fetch<void, boolean>({
            uri: `${TasksService.uri}/${id}`,
            method: 'DELETE'
        });

        return Fetch.resolveResponse(response);
    }

}

export default TasksService;
export type {
    Task,
    TaskSearchParams,
    TaskSearchResult,
    TaskCreateParams,
    TaskUpdateParams
}