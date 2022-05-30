import {createContext, ReactNode, useState} from 'react';

interface TaskFields {
    completed: boolean
    title: string
}

interface TaskEditorValue {
    initialFields: TaskFields
    onSave: (fields: TaskFields) => Promise<void> | void
    onCancel: () => Promise<void> | void
}

interface TaskEditorContextValue {
    data?: TaskEditorValue
    setEditor: (value?: TaskEditorValue) => void
}

const TaskEditorContext = createContext<TaskEditorContextValue>({
    data: undefined,
    setEditor: () => { throw new Error('no implemented') }
});

interface TaskEditorProviderProps {
    children?: ReactNode
}

const TaskEditorProvider = (props: TaskEditorProviderProps) => {
    const [editor, setEditor] = useState<TaskEditorValue | undefined>(undefined);

    return <TaskEditorContext.Provider value={{
        data: editor,
        setEditor
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