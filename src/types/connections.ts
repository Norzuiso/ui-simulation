

export interface Connection {
    connections: Connections[]
}

export interface Connections {
    toId: string;
    attributes: Record<string, AnyValue>;
}

export interface AnyValue {
    '@type': string;
    [key: string]: any;
}