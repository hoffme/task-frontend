import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

interface Props {
    children?: ReactNode
}

const ReactQueryProvider = (props: Props) => {
    return <QueryClientProvider client={queryClient}>
        { props.children }
    </QueryClientProvider>
}

export default ReactQueryProvider;