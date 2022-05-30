import {useState, MouseEvent} from 'react';

import Loading from '../../loading';

import Button, { ButtonProps } from '../main';

interface Props extends ButtonProps {
    onClickAsync?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>
}

const AsyncButton = (props: Props) => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) props.onClick(e);
        if (props.onClickAsync) {
            setLoading(true);

            props.onClickAsync(e)
                .finally(() => setLoading(false));
        }
    }

    const buttonProps: Props = { ...props };
    delete buttonProps.onClickAsync;

    return <Button { ...buttonProps } onClick={handleOnClick}>
        {
            loading ?
                <Loading light={props.level === 'high'} /> :
                props.children
        }
    </Button>
}

export default AsyncButton;