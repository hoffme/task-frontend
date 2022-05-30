import { useTaskEditor } from '../../../../hooks/taskEditor';

import Button from '../../../commons/buttons/main';

interface Props {
    className?: string
}

const TaskCreateButton = (props: Props) => {
    const taskEditor = useTaskEditor();

    return <Button className={props.className} level={'high'} onClick={taskEditor.create}>
        Nueva Tarea
    </Button>
}

export default TaskCreateButton;