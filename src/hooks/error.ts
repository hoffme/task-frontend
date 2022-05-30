import {useEffect, useState} from 'react';

const useError = (showTime = 5): [Error | undefined, (error: Error | undefined) => void] => {
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        if (!error) return;
        const t = setTimeout(() => { setError(undefined) }, showTime * 1000);
        return () => { clearTimeout(t) }
    }, [showTime, error])

    return [error, setError];
}

export default useError;