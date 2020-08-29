import React from 'react';
import {Graph, GraphData, GraphNode, GraphLink} from 'react-d3-graph';
import { Zone, Portal } from './types';

interface DataDisplayProps {
  zones: Zone[]
  portals: Portal[]
}

const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "white",
    size: 1024,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const portalSizeToColor = {
  2: "green",
  7: "blue",
  20: "yellow"
}

const zoneColorToColor = {
  "black": "black",
  "red": "red",
  "yellow": "yellow",
  "blue": "blue",
  "road": "lightblue"
}

const DataDisplay: React.FC<DataDisplayProps> = ({zones, portals}) => {
  if (zones.length > 0) {
    console.log(portals)
    const data: GraphData<GraphNode, GraphLink> = {
      nodes: zones.map(z => ({id: z.name, color: zoneColorToColor[z.color]})),
      links: portals.map(p => ({source: p.source, target: p.target, color: p.timeLeft < 30 ? "red" : portalSizeToColor[p.size]}))
    }

    return <Graph id="graph-id" data={data} config={config} />;
  }
  return <div>Dataset is currently empty, add some nodes to begin</div>;
};

export default DataDisplay;