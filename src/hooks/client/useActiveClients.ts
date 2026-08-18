import { useEffect, useState } from "react";
import type { Client } from "../../types/clients";
import { getAllActiveClients } from "../../api/clientService";


export function useActiveClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        const data = await getAllActiveClients(controller.signal);
        setClients(data);
      } catch (e: any) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  return { clients, loading, error };
}