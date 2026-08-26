import { useState } from "react";
import { useStreamClientOpenStremas } from "../../hooks/client/useStreamClientOpenStremas";
import { ClientOpenStreamsConnectionsGraph } from "./ClientOpenStreamsConnectionsGraph";
import { ClientInfoComp } from "./ClientInfo";
import { useContainerSize } from "../../hooks/useContainerSize";
import type { ClientInfo } from "../../types/clientInfo";

export function ClientOpenStreams() {
    const { clientsInfo, connected, clearClientsInfo } = useStreamClientOpenStremas('http://127.0.0.1:8090/client/open-streams/stream');
    clientsInfo.sort((a, b) => Number(a.client.id) - Number(b.client.id))

    const [selectedClient, setSelectedClient] = useState<ClientInfo>();
    const [isClientSelected, setIsClientSelected] = useState<Boolean>(false);
    const { ref, width, height } = useContainerSize();

    const onSelectClient = (id: string) => {
        const client = clientsInfo.find((c) => c.client.id === id)
        setSelectedClient(client);
        setIsClientSelected(true)
    }

    return (
        <>
            {isClientSelected && (
                <ClientInfoComp clientId={selectedClient}
                    onClose={() => setIsClientSelected(false)}></ClientInfoComp>
            )}
            <div className="max-h-fit">

                <h1 className="text-2xl font-bold text-gray-800">{connected ? "Connected clients" : "No connections founded"}</h1>
                <div className="flex flex-col md:flex-row gap-2">
                    {/**  
                 * 
                 * TABLE 
                 * 
                 * */}
                    <div className="w-full lg:h-200 md:h-200 sm:h-96 table-auto md:w-1/5 md:border-r md:border-gray-300 overflow-auto">
                        <div className="w-full ">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th
                                            className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                    </tr>

                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {clientsInfo.map((c) => (
                                        <tr key={c.client.id} className="hover:bg-gray-300" onClick={() => onSelectClient(c.client.id)}>
                                            <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                                {c.client.id}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                                {c.client.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/**  
                 * 
                 * GRAPH 
                 * 
                 * */}
                    <div ref={ref} className="flex-1 min-w-0 bg-amber-50">
                        {clientsInfo ?
                            <ClientOpenStreamsConnectionsGraph info={clientsInfo}
                                width={width}
                                height={height}
                                onClientClick={(id: string) => onSelectClient(id)} />
                            : <p>No open connections detected</p>}
                        <div />
                    </div>

                </div>
            </div>
        </>
    )
}