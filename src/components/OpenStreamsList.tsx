import { useOpenStreams } from "../hooks/useClientOpenStreams";
import { ErrorMessage } from "./ErrorMessage";

export function OpenStreamsList() {
    const { openStreams, loading, error } = useOpenStreams();
    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage message={error}></ErrorMessage>;

    return (
        <div>
            <h1>Clients with open streams</h1>
            <ul>
                {openStreams.map(c => (
                    <li key={c}> {c}</li>
                ))}
            </ul>
        </div>
    );
}