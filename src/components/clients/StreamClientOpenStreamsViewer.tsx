import { useEffect, useRef } from "react";
import { useStreamClientOpenStremas } from "../../hooks/client/useStreamClientOpenStremas";
import { ClientOpenStreamsConnectionsGraph } from "../OpenStreamsConnectionsGraph";

export function StreamClientOpenStreamsViewer() {
    const { clientsInfo, connected, clearClientsInfo } = useStreamClientOpenStremas('http://127.0.0.1:8090/client/open-streams/stream');
    const bottomRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [clientsInfo]);
    console.log(clientsInfo)
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>
                    State: {connected ? 'Connected' : 'Disconnected'}
                </span>
                <button onClick={clearClientsInfo}>Clear</button>
            </div>

            <div
                style={{
                    height: '90%',
                    overflowY: 'auto',
                    backgroundColor: '#111',
                    color: '#cbcaca',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    padding: 12
                }}
            >
                {clientsInfo.map((c, i) => (
                    <div key={i}>{i}: {c.client.name}</div>
                ))}
                {clientsInfo ?
                    <>
                        {clientsInfo.map(client => (
                            <span key={client.client.id}>
                                {client.client.id}
                            </span>
                        ))}
                        <ClientOpenStreamsConnectionsGraph info={clientsInfo} />
                    </>
                    : <p>No open connections detected</p>}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}