import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import useJoinClassName from '../../../../hooks/joinClassName';

import style from './style.module.scss';

const StyleLevel = {
    high: style.high,
    normal: style.normal,
    low: style.low,
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    level?: keyof typeof StyleLevel
}

const Button = (props: ButtonProps) => {
    const buttonClassName = useJoinClassName(
        style.container,
        props.className,
        StyleLevel[props.level || 'normal']
    );

    const buttonProps = { ...props };
    delete buttonProps.level;

    return <button { ...buttonProps } className={buttonClassName} />;
}

export default Button;
export type {
    ButtonProps
}