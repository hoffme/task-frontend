import { useTaskEditor } from '../../../../hooks/task';

import TaskForm from '../form';

interface Props {
    className?: string
}

const TaskEditor = (props: Props) => {
    const { data } = useTaskEditor();

    if (!data) return <></>;

    return <TaskForm
        className={props.className}
        fields={data.initialFields}
        onSave={data.onSave}
        onCancel={data.onCancel}
    />
}

export default TaskEditor;