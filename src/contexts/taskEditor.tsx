import {createContext, ReactNode, useState} from 'react';

import TasksService, {Task} from '../services/tasks';

interface TaskFields {
    completed: boolean
    title: string
}

interface TaskEditorValue {
    initialFields: TaskFields
    onSave: (fields: TaskFields) => Promise<void>
    onCancel: () => Promise<void>
}

interface TaskEditorContextValue {
    editor?: TaskEditorValue
    create: () => void
    update: (task: Task) => void
    close: () => void
}

const TaskEditorContext = createContext<TaskEditorContextValue>({
    editor: undefined,
    create: () => { throw new Error('no implemented') },
    update: () => { throw new Error('no implemented') },
    close: () => { throw new Error('no implemented') },
});

interface TaskEditorProviderProps {
    children?: ReactNode
}

const TaskEditorProvider = (props: TaskEditorProviderProps) => {
    const [editor, setEditor] = useState<TaskEditorValue | undefined>(undefined);

    const create = () => {
        setEditor({
            initialFields: {
                title: '',
                completed: false
            },
            onSave: async (fields) => {
                await TasksService.Create({
                    title: fields.title,
                    completed: fields.completed
                });
                close();
            },
            onCancel: async () => close()
        })
    }

    const update = (task: Task) => {
        setEditor({
            initialFields: {
                title: task.title,
                completed: task.completed
            },
            onSave: async (fields) => {
                await TasksService.Update({
                    id: task.id,
                    title: fields.title,
                    completed: fields.completed
                });
                close();
            },
            onCancel: async () => close()
        })
    }

    const close = () => setEditor(undefined);

    return <TaskEditorContext.Provider value={{
        editor,
        create,
        update,
        close
    }}>
        { props.children }
    </TaskEditorContext.Provider>
}

export default TaskEditorContext;
export { TaskEditorProvider };
export type {
    TaskEditorValue,
    TaskFields
};