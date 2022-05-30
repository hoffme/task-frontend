import useJoinClassName from '../../../../hooks/joinClassName';
import {useTasksPage} from '../../../../hooks/task';

import Loading from '../../../commons/loading';
import Pagination from '../../../commons/pagination';

import TaskRow from '../row';

import style from './style.module.scss';

interface Props {
    className?: string
}

const TasksList = (props: Props) => {
    const { data, isLoading, page, setPage } = useTasksPage();

    const containerClassName = useJoinClassName(style.container, props.className);

    return <div className={containerClassName}>
        <div className={style.items}>
            { isLoading && <Loading /> }
            {
                !isLoading && (!data || data.items.length === 0) &&
                    <label className={style.empty}>No hay Tareas</label>
            }
            {
                !isLoading && data && data.items.map((task, index) => (
                    <TaskRow key={index} className={style.item} task={task} />
                ))
            }
        </div>
        {
            data && data.pages > 0 &&
                <Pagination index={page} onIndex={setPage} max={data.pages} />
        }
    </div>
}

export default TasksList;