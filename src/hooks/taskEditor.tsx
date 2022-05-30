import {useContext} from 'react';

import TaskEditorContext from '../contexts/taskEditor';

const useTaskEditor = () => {
    return useContext(TaskEditorContext);
}

export { useTaskEditor }