import type { Client } from "../types/clients";
import type { ClientInfo } from "../types/clientInfo";
import type { Connection } from "../types/connections";

const ORCHESTRATOR_URL = 'http://127.0.0.1:8090'; // TODO - Change this to get it from an env file

export async function getAllActiveClients(signal?: AbortSignal): Promise<Client[]> {
    const res = await fetch(`${ORCHESTRATOR_URL}/client/active`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function getAllOpenStreams(signal?: AbortSignal): Promise<number[]> {
    const res = await fetch(`${ORCHESTRATOR_URL}/client/open-streams`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function getClientInfoById(id: string, signal?: AbortSignal): Promise<ClientInfo> {
    const res = await fetch(`${ORCHESTRATOR_URL}/client/info?id=${id}`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function getClientConnections(id: string, signal?: AbortSignal): Promise<Connection> {
    const res = await fetch(`${ORCHESTRATOR_URL}/client/client-to-client?id=${id}`, {signal});
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}