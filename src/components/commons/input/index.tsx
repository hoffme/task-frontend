import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

import useJoinClassName from '../../../hooks/joinClassName';

import style from './style.module.scss';

const Input = (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    const className = useJoinClassName(style.container, props.className);
    return <input { ...props } className={className} />;
}

export default Input;