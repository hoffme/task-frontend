import TasksService, {Task} from '../../../../services/tasks';

import useJoinClassName from '../../../../hooks/joinClassName';
import { useTaskEditor } from '../../../../hooks/task';

import Icon from '../../../commons/icon';
import Button from '../../../commons/buttons/main';
import AsyncButton from '../../../commons/buttons/async';

import style from './style.module.scss';

interface Props {
    task: Task
    className?: string
}

const TaskRow = (props: Props) => {
    const { updateTask } = useTaskEditor();

    const handleEdit = () => updateTask(props.task);

    const handleDelete = () => TasksService.Delete(props.task.id);

    const containerClassName = useJoinClassName(style.container, props.className);

    return <div className={containerClassName}>
        <Icon
            className={style.icon}
            type={'check'}
            color={props.task.completed ? 'green' : 'gray'}
        />
        <label className={style.title}>
            { props.task.title }
        </label>
        <div className={style.actions}>
            <Button level={'high'} className={style.editButton} onClick={handleEdit}>
                Editar
            </Button>
            <AsyncButton level={'normal'} className={style.deleteButton} onClickAsync={handleDelete}>
                Eliminar
            </AsyncButton>
        </div>
    </div>
}

export default TaskRow;