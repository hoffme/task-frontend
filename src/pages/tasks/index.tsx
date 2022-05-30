import {TaskEditorProvider} from '../../contexts/taskEditor';

import TaskEditor from '../../components/customs/tasks/editor';
import TaskCreateButton from '../../components/customs/tasks/buttons/create';
import TasksList from '../../components/customs/tasks/list';

import style from './style.module.scss';

const TasksPage = () => {
    return <TaskEditorProvider>
        <div className={style.container}>
            <TaskEditor className={style.form} />
            <TaskCreateButton className={style.createButton} />
            <TasksList className={style.list} />
        </div>
    </TaskEditorProvider>
}

export default TasksPage;