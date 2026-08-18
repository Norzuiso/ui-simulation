import { ErrorMessage } from "../ErrorMessage";
import { ClientConnectionsGraph } from "./ClientConnectionsGraph"
import { useClientInfo } from "../../hooks/client/useClientInfo";

interface ClientInfoProps {
    clientId: string;
    onClose: () => void;
}

export function ClientInfoComp({ clientId, onClose }: ClientInfoProps) {
    const { info, loading, error } = useClientInfo(clientId);

    console.log(info)
    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage message={error} />;
    return (
        <div>
            <button onClick={onClose}> Close</button>
            <h2>{info?.client.id} {info?.client.name}</h2>
            <p> {info?.client.description && (<p>Description: {info.client.description}</p>)} </p>
            <p>{info?.hasOpenStream.toString()}</p>
            {info?.connections.connections ? (
                <ClientConnectionsGraph info={info} />
            ) : (
                <p>No connections</p>
            )}
        </div>
    );
}