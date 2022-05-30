import useJoinClassName from '../../../../hooks/joinClassName';

import style from './style.module.scss';

interface Props {
    className?: string
}

const Header = (props: Props) => {
    const containerClassName = useJoinClassName(style.container, props.className);

    return <header className={containerClassName}>
        <h3 className={style.title}>Todo App</h3>
    </header>
}

export default Header;