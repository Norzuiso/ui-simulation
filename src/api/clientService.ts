import type { Client } from "../types/clients";
import type { ClientInfo } from "../types/clientInfo";
import type { Connection } from "../types/connections";

export const ORCHESTRATOR_URL_CLIENT = 'http://127.0.0.1:8090/client'; // TODO - Change this to get it from an env file

export async function getAllActiveClients(signal?: AbortSignal): Promise<Client[]> {
    const res = await fetch(`${ORCHESTRATOR_URL_CLIENT}/active`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function getAllOpenStreams(signal?: AbortSignal): Promise<number[]> {
    const res = await fetch(`${ORCHESTRATOR_URL_CLIENT}/open-streams`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function getClientInfoById(id: string, signal?: AbortSignal): Promise<ClientInfo> {
    const res = await fetch(`${ORCHESTRATOR_URL_CLIENT}/info?id=${id}`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}


export async function getOpenStreamsClientsInfo(signal?: AbortSignal): Promise<ClientInfo[]> {
    const res = await fetch(`${ORCHESTRATOR_URL_CLIENT}/open-streams/info`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}