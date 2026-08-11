import { useState, useEffect } from 'react'
import { getClientInfoById } from '../api/clientService'
import type { ClientInfo } from '../types/clientInfo'


export function useClientInfo(id: string){
    const [info, setInfo] = useState<ClientInfo>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if (!id) return;

        const controller = new AbortController();

        async function load() {
            try {
                setLoading(true);
                const data = await getClientInfoById(id, controller.signal);
                setInfo(data);
            } catch (e: any) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally{
                setLoading(false);
            }
        }
        load();
        return () => controller.abort();
    }, [id]);

    return {info, loading, error}

}