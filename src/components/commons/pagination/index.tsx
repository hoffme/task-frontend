import useJoinClassName from '../../../hooks/joinClassName';

import style from './style.module.scss';

interface Props {
    index: number
    onIndex: (index: number) => void
    max: number
    className?: string
}

const Pagination = (props: Props) => {
    const containerClassName = useJoinClassName(style.container, props.className);

    const backDisabled = props.index <= 0;
    const nextDisabled = props.index >= props.max - 1;

    const back = () => {
        if (backDisabled) return;

        props.onIndex(props.index - 1);
    }

    const next = () => {
        if (nextDisabled) return;

        props.onIndex(props.index + 1);
    }

    return <div className={containerClassName}>
        <button disabled={backDisabled} onClick={back}>{'<'}</button>
        <label>{props.index + 1} de {props.max}</label>
        <button disabled={nextDisabled} onClick={next}>{'>'}</button>
    </div>
}

export default Pagination;