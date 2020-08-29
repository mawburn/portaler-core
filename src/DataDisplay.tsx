import React from 'react';
import {Graph, GraphData, GraphNode, GraphLink} from 'react-d3-graph';

interface DataDisplayProps {
  data: GraphData<GraphNode, GraphLink>
}

const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightblue",
    size: 1024,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
};

const DataDisplay: React.FC<DataDisplayProps> = ({data}) => {
  if (data.nodes.length > 0) {
    return <Graph id="graph-id" data={data} config={config} />;
  }
  return <div>Dataset is currently empty, add some nodes to begin</div>;
};

export default DataDisplay;