import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import TasksService from '../services/tasks';

import { TaskEditorValue, TaskFields } from '../contexts/taskEditor';

const useTasksPage = () => {
    const [page, setPage] = useState<number>(0);

    const {
        data,
        isLoading,
        error
    } = useQuery(
        ['tasks', page],
        () => TasksService.Search({ page, limit: 15 }),
        { keepPreviousData: true }
    );

    return { data, isLoading, error, page, setPage }
}

const useTaskMutationEffects = <P, R>(method: (params: P) => Promise<R>) => {
    const queryClient = useQueryClient();

    return useMutation<R, unknown, P, unknown>(method, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
                .catch(console.error)
        }
    });
}

const useCreateTaskMutation = () => {
    return useTaskMutationEffects(TasksService.Create);
}

const useUpdateTaskMutation = () => {
    return useTaskMutationEffects(TasksService.Update);
}

const useDeleteTaskMutation = () => {
    return useTaskMutationEffects(TasksService.Delete);
}

export {
    useTaskMutationEffects,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useTasksPage
};

export type {
    TaskEditorValue,
    TaskFields
}