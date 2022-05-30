import { Route, Routes } from 'react-router-dom';

import LayoutMain from '../components/layouts/main';

import { TasksPage } from '../pages';

const AppRoutes = () => {
    return <LayoutMain>
        <Routes>
            <Route path={'*'} element={<TasksPage />} />
        </Routes>
    </LayoutMain>
}

export default AppRoutes;