import type { StartSimulationRequest } from "../types/startSimulation";

export const ORCHESTRATOR_URL_SIMULATION = 'http://127.0.0.1:8090/simulation'; // TODO - Change this to get it from an env file

export async function nextEpoch(signal?: AbortSignal): Promise<string> {
    const res = await fetch(`${ORCHESTRATOR_URL_SIMULATION}/next-epoch`, { signal });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}

export async function startSimulation(req: StartSimulationRequest, signal?: AbortSignal): Promise<string> {
    const res = await fetch(`${ORCHESTRATOR_URL_SIMULATION}/start`, { signal: signal, body: JSON.stringify(req) });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}