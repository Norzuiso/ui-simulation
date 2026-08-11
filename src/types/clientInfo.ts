import type { Client } from "./clients";
import type { Connection } from "./connections";


export interface ClientInfo{
    client: Client;
    hasOpenStream: string;
    connections: Connection
}