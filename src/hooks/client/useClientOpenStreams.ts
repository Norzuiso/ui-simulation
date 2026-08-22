import { useEffect, useState } from "react";
import { getAllOpenStreams } from "../../api/clientService";


export function useOpenStreams() {
    const [openStreams, setOpenStreams] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                setLoading(true);
                const data = await getAllOpenStreams(controller.signal);
                setOpenStreams(data);
            } catch (e: any) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => controller.abort();
    }, []);

    return { openStreams, loading, error }

}