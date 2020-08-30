import React, { useState } from 'react';
import { Zone, Portal } from './types';
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition } from 'cytoscape';

interface DataDisplayProps {
  zones: Zone[];
  portals: Portal[];
}


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

const DataDisplay: React.FC<DataDisplayProps> = ({ zones, portals }) => {
  const [layout, setLayout] = useState("grid")


  if (zones.length > 0) {
    const now = new Date();
    const data: ElementDefinition[] = [
      ...zones.filter(z => {
        return !!portals.find(p => p.source === z.name || p.target === z.name)
      }).map((z) => ({
        data: { id: z.name, label: z.name },
        style: {
          backgroundColor: zoneColorToColor[z.color],
        },
      })),
      ...portals.map((p) => ({
        data: { source: p.source, target: p.target, label: `${Math.floor(p.timeLeft / 60)}h ${Math.round(p.timeLeft % 60)}min` },
        classes: p.timeLeft < 30 ? 'timeLow': '',
        style: {
          lineColor: portalSizeToColor[p.size],
        },
      })),
    ];

    return (
      <>
      <CytoscapeComponent
        elements={data}
        style={{ height: "1080px", width: "100%" }}
        stylesheet={[
          {
            "selector": "node[label]",
            "style": {
              "label": "data(label)"
            }
          },
          {
            "selector": "edge[label]",
            "style": {
              "label": "data(label)",
              "width": 3
            }
          },
          {
            "selector": ".timeLow",
            "style": {
              "color": "red",
            }
          },
        ]}
        layout={{ name: layout }}
      />
      <select onChange={e => setLayout(e.target.value)} value={layout}>
        <option>random</option>
        <option>grid</option>
        <option>circle</option>
        <option>cose</option>
        <option>concentric</option>
        <option>breadthfirst</option>
      </select>
      </>
    );
  }
  return <div>Dataset is currently empty, add some nodes to begin</div>;
};

export default DataDisplay;