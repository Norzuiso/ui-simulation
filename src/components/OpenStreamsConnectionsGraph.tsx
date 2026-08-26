import type { ClientInfo } from "../types/clientInfo";
import { useEffect, useRef } from "react";
import { forceCollide } from "d3-force";
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d';

interface GraphLink {
    source: string;
    target: string;
    label: string;
}

function createGraphData(infoList: ClientInfo[]) {
    var nodes: any[] = []
    var linksFormated: GraphLink[] = []
    infoList.forEach(c => {
        const clientInfo = {
            id: c.client.id,
            name: c.client.name,
            fx: 0,
            fy: 0,
            isActive: true
        };
        nodes.push(clientInfo);
        c.connections?.connections?.map(conn => {
            const hasNode = infoList.some(node => node.client.id == conn.toId);
            if (!hasNode) {
                const clientInfo = {
                    id: conn.toId,
                    name: conn.toId,
                    fx: 0,
                    fy: 0,
                    isActive: false
                };
                nodes.push(clientInfo);
            }
            linksFormated.push({
                source: c.client.id,
                target: conn.toId,
                label: conn.attributes.influence.value.toString()
            });
        })
    });
    nodes = nodes.map((c, i, arr) => {
        const angle = (i / arr.length) * 2 * Math.PI;
        const radius = 150;
        return {
            id: c.id,
            name: c.name,
            isActive: c.isActive,
            fx: Math.cos(angle) * radius,
            fy: Math.sin(angle) * radius,
        }
    })

    return {
        nodes: nodes,
        links: [...linksFormated],
    };

}


export function ClientOpenStreamsConnectionsGraph({ info: infoList, onClientClick: onClientClick, width, height }: { info: ClientInfo[], onClientClick: any, width: number, height: number }) {
    const graphData = createGraphData(infoList);

    const graphRef = useRef<ForceGraphMethods | undefined>(undefined);
    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('center', forceCollide(1));
        }
    }, []);

    return (

        <ForceGraph2D
            ref={graphRef}
            graphData={graphData}

            width={width}
            height={height}
            backgroundColor="#dbdbdb"
            onNodeClick={(node) => onClientClick(node.id?.toString())}
            nodeLabel="name"
            nodeAutoColorBy="id"
            nodeCanvasObjectMode={() => 'replace'}
            nodeCanvasObject={(node, ctx) => {
                const label = String(node.id);
                const fontSize = 10;
                ctx.font = `${fontSize}px Sans-Serif`;

                const textWith = ctx.measureText(label).width;
                const radius = Math.max(textWith, fontSize) / 2 + 6
                node.__radius = radius;

                ctx.beginPath();
                ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI)
                ctx.fillStyle = node.isActive ? '#0ac600' : '#a42929'
                ctx.fill();


                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#ffffff'
                ctx.fillText(label, node.x!, node.y!);
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
                const radius = node.__radius || 10;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI)
                ctx.fill();
            }}

            linkCanvasObjectMode={() => 'replace'}
            linkCanvasObject={(link, ctx) => {
                const source = link.source as any;
                const target = link.target as any;
                if (typeof source !== 'object' || typeof target !== 'object') return;

                const sourceRadius = source.__radius || 10;
                const targetRadius = target.__radius || 10;

                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) return;

                const ux = dx / dist;
                const uy = dy / dist;

                const startX = source.x + ux * sourceRadius;
                const startY = source.y + uy * sourceRadius;


                const endX = target.x - ux * targetRadius;
                const endY = target.y - uy * targetRadius;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();

                const arrowLength = 6;
                const arrowAngle = Math.PI / 7;

                const angle = Math.atan2(uy, ux);

                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(
                    endX - arrowLength * Math.cos(angle - arrowAngle),
                    endY - arrowLength * Math.sin(angle - arrowAngle)
                );
                ctx.lineTo(
                    endX - arrowLength * Math.cos(angle + arrowAngle),
                    endY - arrowLength * Math.sin(angle + arrowAngle)
                );
                ctx.closePath();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
                ctx.fill();

                const label = link.label;
                const fontSize = 10;
                ctx.font = `${fontSize}px Sans-Serif`;

                const textLenght = ctx.measureText(label).width;
                const textAngle = Math.PI / 7;
                var xText = endX - textLenght * Math.cos(angle - textAngle);
                var yText = endY - textLenght * Math.sin(angle - textAngle);


                ctx.fillText(label,
                    xText,
                    yText);

            }}
        ></ForceGraph2D>

    )

}