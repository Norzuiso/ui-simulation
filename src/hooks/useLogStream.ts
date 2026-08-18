import { useState, useEffect, useRef } from 'react';


export function useLogStream(url: string) {
    const [logs, setLogs] = useState<string[]>([]);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);


    useEffect(() => {
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            setConnected(true);
        };

        eventSource.onmessage = (event) => {
            setLogs(prev => [...prev, event.data])
        };

        eventSource.onerror = () => {
            setConnected(false);
        };

        return () => {
            eventSource.close();
        };
    }, [url]);

    const clearLogs = () => setLogs([])
    return { logs, connected, clearLogs }
}