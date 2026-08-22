import { useState, useEffect, useRef } from 'react';
import type { ClientInfo } from '../../types/clientInfo';


export function useStreamClientOpenStremas(url: string) {
    const [clientsInfo, setClientsInfo] = useState<ClientInfo[]>([]);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);


    useEffect(() => {
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            setConnected(true);
        };

        eventSource.onmessage = (event) => {
            var clientInfo: ClientInfo = JSON.parse(event.data)
            if (clientInfo.hasOpenStream) {
                setClientsInfo(prev => [...prev, clientInfo]);
            } else {
                setClientsInfo(prev => prev.filter(item => item.client.id !== clientInfo.client.id));
            }
        };

        eventSource.onerror = () => {
            setConnected(false);
        };

        return () => {
            eventSource.close();
        };
    }, [url]);

    const clearClientsInfo = () => setClientsInfo([])
    return { clientsInfo: clientsInfo, connected, clearClientsInfo: clearClientsInfo }
}