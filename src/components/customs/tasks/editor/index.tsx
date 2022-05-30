import { useTaskEditor } from '../../../../hooks/taskEditor';

import TaskForm from '../form';

interface Props {
    className?: string
}

const TaskEditor = (props: Props) => {
    const taskEditor = useTaskEditor();

    if (!taskEditor.editor) return <></>;

    return <TaskForm
        className={props.className}
        fields={taskEditor.editor.initialFields}
        onSave={taskEditor.editor.onSave}
        onCancel={taskEditor.editor.onCancel}
    />
}

export default TaskEditor;