import { ReactComponent as LoadingIcon } from '../../../assets/icons/loading.svg';

import useJoinClassName from '../../../hooks/joinClassName';

import style from './style.module.scss';

interface LoadingProps {
    light?: boolean
}

const Loading = (props: LoadingProps) => {
    const containerClassName = useJoinClassName(
        style.container,
        props.light ? style.light : undefined
    )

    return <div className={containerClassName}>
        <LoadingIcon />
    </div>
}

export default Loading;
