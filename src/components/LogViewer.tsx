import { useEffect, useRef } from "react";
import { useLogStream } from "../hooks/useLogStream";

export function LogViewer() {
    const { logs, connected, clearLogs } = useLogStream('http://127.0.0.1:8090/logs/stream');
    const bottomRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>
                    State: {connected ? 'Connected' : 'Disconnected'}
                </span>
                <button onClick={clearLogs}>Clear</button>
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
                {logs.map((log, i) => (
                    <div key={i}>{i}: {log}</div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}