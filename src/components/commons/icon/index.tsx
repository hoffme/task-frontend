import {MouseEventHandler} from 'react';

import { ReactComponent as LoadingIcon } from '../../../assets/icons/loading.svg';
import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';

import useJoinClassName from '../../../hooks/joinClassName';

import style from './style.module.scss';

const icons = {
    'loading': LoadingIcon,
    'check': CheckIcon
}

interface Props {
    type: keyof typeof icons
    color?: string
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}

const Icon = (props: Props) => {
    const containerClassName = useJoinClassName(style.container, props.className);

    const Icon = icons[props.type];

    return <div className={containerClassName} onClick={props.onClick}>
        { <Icon fill={props.color || 'gray'} /> }
    </div>
}

export default Icon;