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
            <div>
                <span>
                    State: {connected ? 'Connected' : 'Disconnected'}
                </span>
                <button onClick={clearLogs}>Clear</button>
            </div>

            <div>
                {logs.map((log, i) => (
                    <div key={i}>{i}: {log}</div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}