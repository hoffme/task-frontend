import { BrowserRouter } from 'react-router-dom';

import ReactQueryProvider from './contexts/reactQuery';

import AppRoutes from './routes';

import './global.scss';

const App = () => {
    return <BrowserRouter>
        <ReactQueryProvider>
            <AppRoutes />
        </ReactQueryProvider>
    </BrowserRouter>
}

export default App;
