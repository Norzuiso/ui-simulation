import { useOpenStreamsClientsInfo } from "../hooks/useOpenStreamsClientInfo";
import { ErrorMessage } from "./ErrorMessage";
import { ClientOpenStreamsConnectionsGraph } from "./OpenStreamsConnectionsGraph";


export function OpenStreamsClientsInfo() {
    const { openStreamsInfo, loading, error } = useOpenStreamsClientsInfo();

    openStreamsInfo.sort((a, b) => a.client.id.localeCompare(b.client.id))
    if (loading) return <p>Loading...</p>
    if (error) return <ErrorMessage message={error}></ErrorMessage>

    return (
        <>
            {openStreamsInfo ?
                <>
                    {openStreamsInfo.map(client => (
                        <span key={client.client.id}>
                            {client.client.id}
                        </span>
                    ))}
                    <ClientOpenStreamsConnectionsGraph info={openStreamsInfo}></ClientOpenStreamsConnectionsGraph>
                </>
                : <p>No open connections detected</p>}
        </>
    )
}
