import { ErrorMessage } from "../ErrorMessage";
import { ClientConnectionsGraph } from "./ClientConnectionsGraph"
import { useClientInfo } from "../../hooks/client/useClientInfo";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ClientOpenStreamsConnectionsGraph } from "../OpenStreamsConnectionsGraph";
import { useContainerSize } from "../../hooks/useContainerSize";
import type { ClientInfo } from "../../types/clientInfo";

interface ClientInfoProps {
    clientId: ClientInfo | undefined;
    onClose: () => void;
}

export function ClientInfoComp({ clientId, onClose }: ClientInfoProps) {
    const { ref, width, height } = useContainerSize();

    const client = clientId
    return (
        <Dialog open={true} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-600 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="
                            max-w-6xl
                            max-h-full
                            w-full
                            h-full  
                            sm:my-8
                            relative 
                            transform  
                            rounded-lg 
                            bg-gray-800 
                            text-left 
                            shadow-xl 
                            outline 
                            -outline-offset-1 outline-white/10 transition-all 
                            data-closed:translate-y-4 
                            data-closed:opacity-0 
                            data-enter:duration-300 
                            data-enter:ease-out 
                            data-leave:duration-200 
                            data-leave:ease-in  
                            data-closed:sm:translate-y-0 data-closed:sm:scale-95
                        "
                    >
                        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h1" className="text-2xl font-semibold text-white">
                                        {client?.client.id} - {client?.client.name}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-400">
                                            {client?.client.description && (<p>Description: {client.client.description}</p>)} </p>
                                        <p className="text-sm text-gray-400">
                                            {client?.hasOpenStream ? "Has an open stream" : ""}</p>
                                    </div>
                                    <div ref={ref} className="h-full w-full">
                                        {client?.connections.connections ? (
                                            <ClientOpenStreamsConnectionsGraph
                                                info={[client]}
                                                onClientClick={(i: string) => console.log(i)}
                                                width={width <= 0 ? 1024 : width}
                                                height={height <= 0 ? 500 : height}
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-400">No open connections detected</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                            <button
                                type="button"
                                onClick={onClose}
                                data-autofocus
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

    );
}