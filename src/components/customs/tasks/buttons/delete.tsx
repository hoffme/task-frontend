import {useDeleteTaskMutation} from '../../../../hooks/task';

import Button from '../../../commons/buttons/main';
import Loading from '../../../commons/loading';

interface Props {
    id: string
    className?: string
}

const TaskDeleteButton = (props: Props) => {
    const { mutate, isLoading } = useDeleteTaskMutation();

    return <Button
        className={props.className}
        level={'low'}
        onClick={() => mutate(props.id)}
    >
        { isLoading ? <Loading /> : 'Eliminar' }
    </Button>
}

export default TaskDeleteButton;