import { ReactNode } from 'react';

import Header from './header';

import style from './style.module.scss';

interface Props {
    children?: ReactNode
}

const LayoutMain = (props: Props) => {
    return <div className={style.container}>
        <Header className={style.header} />
        <main className={style.content}>
            { props.children }
        </main>
    </div>
}

export default LayoutMain;