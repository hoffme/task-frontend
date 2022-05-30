import {useCallback, useContext, useEffect, useState} from 'react';

import TasksService, {Task, TaskSearchParams, TaskSearchResult} from '../services/tasks';

import TaskEditorContext, { TaskEditorValue, TaskFields } from '../contexts/taskEditor';

const useTaskEditor = () => {
    const { data, setEditor } = useContext(TaskEditorContext);

    const close = () => setEditor(undefined);

    const createTask = () => {
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
            onCancel: close
        })
    }

    const updateTask = (task: Task) => {
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
            },
            onCancel: close
        })
    }

    return {
        data,
        createTask,
        updateTask,
        close
    };
}

const defaultData: TaskSearchResult = {
    items: [],
    page: 0,
    limit: 0,
    total: 0,
    pages: 0
}

const useTaskSearch = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<TaskSearchResult>(defaultData);

    const [filter, setFilter] = useState<TaskSearchParams>({});

    const search = useCallback((filter: TaskSearchParams): void => {
        setFilter(filter);
        setError(undefined);
        setIsLoading(true);

        TasksService.Search(filter)
            .then(setData)
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const reload = () => search(filter);

        const createSubscription = TasksService.events.create.subscribe(reload);
        const updateSubscription = TasksService.events.update.subscribe(reload);
        const remoceSubscription = TasksService.events.remove.subscribe(reload);

        return () => {
            createSubscription.unsubscribe();
            updateSubscription.unsubscribe();
            remoceSubscription.unsubscribe();
        }
    }, [filter, search])

    return {
        data,
        isLoading,
        error,
        search
    }
}

export {
    useTaskEditor,
    useTaskSearch
};
export type {
    TaskEditorValue,
    TaskFields
}