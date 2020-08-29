import React, { useState, useCallback } from 'react';


export type GateSize = 2 | 7 | 20;

interface DataInputProps {
  existingIDs: string[]; 
  addLink: (from: string, to: string, size: GateSize) => void;
}

const DataInput: React.FC<DataInputProps> = ({existingIDs, addLink}) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [size, setSize] = useState<GateSize>(2);

  const filteredFrom = existingIDs.filter(id => from.length < 1 || id.indexOf(from) === 0)
  const filteredTo = existingIDs.filter(id => to.length < 1 || id.indexOf(to) === 0)

  const submit = useCallback(() => {
    if (from && to) {
      addLink(from, to, size)
    } 
  }, [from, to, size, addLink]);

  return <div className="DataInput">
    <div className="from">
      <span>From</span>
      <input type="text" value={from} onChange={e => setFrom(e.currentTarget.value)} />
      <select onChange={e => setFrom(e.target.value)}>
        {filteredFrom.map(id => <option key={id}>{id}</option>)}
      </select>
    </div>
     
    <div className="to">
      <span>To</span>
      <input type="text" value={to} onChange={e => setTo(e.currentTarget.value)} />
      <select onChange={e => setTo(e.target.value)}>
        {filteredTo.map(id => <option key={id}>{id}</option>)}
      </select>
    </div>

    <div className="size">
      <span>Size</span>
      <select onChange={e => setSize(parseInt(e.target.value) as GateSize)}>
        {[2,7,20].map(alt => <option key={alt}>{alt}</option>)}
      </select>
    </div>

    <button onClick={submit}>Add</button>
  </div>
}

export default DataInput;