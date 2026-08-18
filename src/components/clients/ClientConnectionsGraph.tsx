import ForceGraph2D from "react-force-graph-2d";
import type { ClientInfo } from "../../types/clientInfo";
import { withSize } from 'react-sizeme'

interface GraphNode {
    id: string;
    name: string;
    seed: string;
}

interface GraphLink {
    source: string;
    target: string;
}


export function ClientConnectionsGraph({ info }: { info: ClientInfo }) {
    const graphData = {
        nodes: [
            { id: info.client.id.toString(), name: info.client.name, seed: info.client.seed },
            ...info.connections.connections.map(conn => ({
                id: conn.toId.toString(),
                name: `Cliente ${conn.toId}`
            })),
        ],
        links: info.connections.connections.map(conn => ({
            source: info.client.id,
            target: conn.toId.toString(),
        })),
    };
    console.log(graphData)
    console.log(graphData.links.length)

    return (
        <ForceGraph2D
            graphData={graphData}
            nodeLabel="name"
            backgroundColor="#dbdbdb"
            nodeAutoColorBy="id"
            linkDirectionalArrowLength={5}
            height={400}
            nodeRelSize={8}
            nodeCanvasObjectMode={node => 'after'}
            nodeCanvasObject={(node, ctx) => {
                ctx.fillText(node.name, node.x!, node.y!);
            }}
        ></ForceGraph2D>
    )
}