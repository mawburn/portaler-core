import React, { useState, useCallback } from 'react';
import './App.css';
import DataDisplay from './DataDisplay';
import DataInput, { GateSize } from './DataInput';
import { GraphData, GraphNode, GraphLink } from 'react-d3-graph';
import ImportExport from './ImportExport';


const defaultData:GraphData<GraphNode, GraphLink> = {
  nodes: [],
  links: []
};

const sizeColors: {[key: number]: string} = {
  2: "green",
  7: "blue",
  20: "yellow"
};

function App() {

  const [data, setData] = useState<GraphData<GraphNode, GraphLink> | null>(null)

  if (!data) {
    const storedData = localStorage.mapData;
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(defaultData);
    }
  }

  const addLink = useCallback((from: string, to: string, size: GateSize) => {
    const nodes = data!.nodes;
    const nodeNames = nodes.map(n => n.id);
    if (nodeNames.indexOf(from) === -1) {
      nodes.push({id: from})
    }
    if (nodeNames.indexOf(to) === -1) {
      nodes.push({id: to})
    }

    const links = [ ...data!.links, {source: from, target: to, color: sizeColors[size]} ] as GraphLink[];

    const newData = {nodes, links};
    setData(newData);
    localStorage.mapData = JSON.stringify(newData); 
  }, [data, setData]);

  const importData = useCallback((raw: string) => {
    const parsed = JSON.parse(raw);
    if (parsed?.nodes && parsed?.links) {
      localStorage.mapData = raw;
      setData(parsed);
    } else {
      localStorage.mapData = JSON.stringify(defaultData);
      setData(defaultData);
    }

  }, [setData]);

  if (data) {
    return (
      <div className="App">
        <DataInput existingIDs={data.nodes.map((n) => n.id)} addLink={addLink}/>

        <DataDisplay data={data} />
        <ImportExport rawData={JSON.stringify(data)} importData={importData}/>
      </div>
    );
  }
  return <div>Error</div>
}

export default App;
