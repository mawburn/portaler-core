import React from 'react';
import {Graph, GraphData, GraphNode, GraphLink} from 'react-d3-graph';
import { Zone, Portal } from './types';

interface DataDisplayProps {
  zones: Zone[];
  portals: Portal[];
  selected: string;
}

const config = {
  nodeHighlightBehavior: true,
  width: 1920,
  height: 1080,
  node: {
    color: "white",
    size: 768,
    highlightStrokeColor: "magenta",
  },
  link: {
    highlightColor: "magenta",
  },
};

const portalSizeToColor = {
  2: "green",
  7: "blue",
  20: "orange"
}

const zoneColorToColor = {
  "black": "black",
  "red": "red",
  "yellow": "yellow",
  "blue": "blue",
  "road": "lightblue"
}

const DataDisplay: React.FC<DataDisplayProps> = ({ zones, portals, selected }) => {
  if (zones.length > 0) {
    console.log(portals);
    const data: GraphData<GraphNode, GraphLink> = {
      nodes: zones.map((z) => ({
        id: z.name,
        color: z.name == selected ? "magenta" : zoneColorToColor[z.color],
      })),
      links: portals.map((p) => ({
        source: p.source,
        target: p.target,
        color: p.timeLeft < 30 ? "red" : portalSizeToColor[p.size],
      })),
    };

    return <Graph id="graph-id" data={data} config={config} />;
  }
  return <div>Dataset is currently empty, add some nodes to begin</div>;
};

export default DataDisplay;