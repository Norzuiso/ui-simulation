import { useState, useEffect } from 'react'
import { getOpenStreamsClientsInfo } from '../api/clientService'
import type { ClientInfo } from '../types/clientInfo'

export function useOpenStreamsClientsInfo() {
    const [openStreamsInfo, setOpenStreamsInfo] = useState<ClientInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        async function load() {
            try {
                setLoading(true);
                const data = await getOpenStreamsClientsInfo(controller.signal);
                setOpenStreamsInfo(data);
            } catch (e: any) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally {
                setLoading(false);
            }

        }

        load();
        return () => controller.abort();
    }, []);
    return { openStreamsInfo, loading, error }
}