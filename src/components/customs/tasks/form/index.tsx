import {useState} from 'react';

import useJoinClassName from '../../../../hooks/joinClassName';
import useError from '../../../../hooks/error';

import AsyncButton from '../../../commons/buttons/async';
import Input from '../../../commons/input';
import Icon from '../../../commons/icon';

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
    onSave: (fields: TaskFormFields) => Promise<void> | void
    onCancel: () => Promise<void> | void
    className?: string
}

const TaskForm = (props: Props) => {
    const [error, setError] = useError();

    const [data, setData] = useState<TaskFormFields>(props.fields || defaultValue);

    const handleSave = async () => {
        setError(undefined);

        try { await props.onSave(data) }
        catch (err: unknown) {
            setError(err instanceof Error ? err : new Error('Error Desconocido'));
        }
    }

    const handleCancel = async () => {
        setError(undefined);

        try { await props.onCancel() }
        catch (err: unknown) {
            setError(err instanceof Error ? err : new Error('Error Desconocido'));
        }
    }

    const containerClassName = useJoinClassName(style.container, props.className);

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
            <AsyncButton level={'high'} className={style.saveButton} onClickAsync={handleSave}>
                Guardar
            </AsyncButton>
            <AsyncButton level={'normal'} className={style.cancelButton} onClickAsync={handleCancel}>
                Cancelar
            </AsyncButton>
        </div>
        { error && <div className={style.error}>{ error.message }</div> }
    </div>
}

export default TaskForm;