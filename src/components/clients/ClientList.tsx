import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import type { Client } from "../../types/clients";
import { ClientInfoComp } from "./ClientInfo";
import { useActiveClients } from "../../hooks/client/useActiveClients";



export function ClientList() {
    const { clients, loading, error } = useActiveClients();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <div>
                <h1>Register Clients</h1>
                <ul>
                    {clients.map(c => (
                        <li key={c.id} onClick={() => setSelectedClient(c)}>
                            {c.id} - {c.name} - {c.description} </li>
                    ))}
                </ul>
            </div>
            {selectedClient && (
                <ClientInfoComp clientId={selectedClient.id}
                    onClose={() => setSelectedClient(null)}></ClientInfoComp>
            )}

        </>
    );
}