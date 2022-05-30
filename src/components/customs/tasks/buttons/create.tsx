import { useTaskEditor } from '../../../../hooks/task';

import Button from '../../../commons/buttons/main';

interface Props {
    className?: string
}

const TaskCreateButton = (props: Props) => {
    const { createTask } = useTaskEditor();

    return <Button className={props.className} level={'high'} onClick={createTask}>
        Nueva Tarea
    </Button>
}

export default TaskCreateButton;