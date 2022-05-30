import {Task} from '../../../../services/tasks';

import useJoinClassName from '../../../../hooks/joinClassName';
import { useTaskEditor } from '../../../../hooks/taskEditor';

import Icon from '../../../commons/icon';
import Button from '../../../commons/buttons/main';
import TaskDeleteButton from '../buttons/delete';

import style from './style.module.scss';

interface Props {
    task: Task
    className?: string
}

const TaskRow = (props: Props) => {
    const taskEditor = useTaskEditor();

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
            <Button level={'high'} onClick={() => taskEditor.update(props.task)}>
                Editar
            </Button>
            <TaskDeleteButton id={props.task.id} />
        </div>
    </div>
}

export default TaskRow;