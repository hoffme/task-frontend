import {useState} from 'react';
import {useMutation} from 'react-query';

import useJoinClassName from '../../../../hooks/joinClassName';
import {useTaskMutationEffects} from '../../../../hooks/task';

import Input from '../../../commons/input';
import Icon from '../../../commons/icon';
import Button from '../../../commons/buttons/main';
import Loading from '../../../commons/loading';

import style from './style.module.scss';

interface TaskFormFields {
    completed: boolean,
    title: string
}

const defaultValue: TaskFormFields = {
    completed: false,
    title: ''
}

interface Props {
    fields: TaskFormFields
    onSave: (fields: TaskFormFields) => Promise<void>
    onCancel: () => Promise<void>
    className?: string
}

const TaskForm = (props: Props) => {
    const save = useTaskMutationEffects(props.onSave);
    const cancel = useMutation(props.onCancel);

    const [data, setData] = useState<TaskFormFields>(props.fields || defaultValue);

    const containerClassName = useJoinClassName(style.container, props.className);

    const saveError = !save.error ? undefined :
        (save.error instanceof Error) ? save.error.message : 'Error Desconocido';
    
    const cancelError = !cancel.error ? undefined :
        (cancel.error instanceof Error) ? cancel.error.message : 'Error Desconocido';
    
    const error = saveError || cancelError;

    return <div className={containerClassName}>
        <div className={style.fields}>
            <Icon
                className={style.icon}
                type={'check'}
                color={data.completed ? 'green' : 'gray'}
                onClick={() => setData({ ...data, completed: !data.completed })}
            />
            <Input
                placeholder={'Titulo'}
                className={style.title}
                type={'text'}
                value={data.title}
                onChange={e => setData({ ...data, title: e.currentTarget.value })}
            />
        </div>
        <div className={style.actions}>
            <Button
                level={'high'}
                className={style.saveButton}
                onClick={() => save.mutate(data)}
            >
                { save.isLoading ? <Loading light /> : 'Guardar' }
            </Button>
            <Button
                level={'normal'}
                className={style.cancelButton}
                onClick={() => cancel.mutate()}
            >
                { cancel.isLoading ? <Loading light /> : 'Cancelar' }
            </Button>
        </div>
        { error && <div className={style.error}>{error}</div> }
    </div>
}

export default TaskForm;