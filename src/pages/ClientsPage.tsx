import { StreamClientOpenStreamsViewer } from '../components/clients/StreamClientOpenStreamsViewer';
import { OpenStreamsClientsInfo } from '../components/OpenStreamsInfo';

export function ClientsPage() {
    return (
        <div>
            <h1>Connected clients</h1>
            <StreamClientOpenStreamsViewer />
        </div>
    );
}