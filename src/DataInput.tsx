import React, { useState, useCallback } from 'react';
import { PortalSize, ZoneColor, ZoneTier } from './types';


interface AddZoneFormProps {
  addZone: (name: string, color: ZoneColor, tier: ZoneTier) => void;
}

const AddZoneForm: React.FC<AddZoneFormProps> = ({addZone}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState<ZoneColor>("road");
  const [tier, setTier] = useState<ZoneTier>(4);

  const submit = useCallback(() => {
    addZone(name, color, tier)
  }, [name, color, tier, addZone]);

  return <div>
    <span>Add zone</span>
    <input type="text" value={name} onChange={e => setName(e.target.value)} />
    <select value={color} onChange={e => setColor(e.target.value as ZoneColor)}>
      <option>road</option>
      <option>black</option>
      <option>red</option>
      <option>yellow</option>
      <option>blue</option>
    </select>
    <select value={tier} onChange={e => setTier(parseInt(e.target.value) as ZoneTier)}>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
    </select>
    <button onClick={submit}>Add</button>
  </div>
}


interface DataInputProps extends AddZoneFormProps{
  existingNames: string[]; 
  addPortal: (source: string, target: string, size: PortalSize, hours: number, minutes: number) => void;
}

const DataInput: React.FC<DataInputProps> = ({existingNames, addPortal, addZone}) => {
  const [showAddZone, setShowAddZone] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [size, setSize] = useState<PortalSize>(2);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const filteredFrom = existingNames//.filter(id => from.length < 1 || id.indexOf(from) === 0)
  const filteredTo = existingNames//.filter(id => to.length < 1 || id.indexOf(to) === 0)

  const submit = useCallback(() => {
    if (from && to) {
      addPortal(from, to, size, hours, minutes)
    } 
  }, [from, to, size, hours, minutes, addPortal]);

  const addZoneAndCloseForm = useCallback((name: string, color: ZoneColor, tier: ZoneTier) => {
    setShowAddZone(false)
    addZone(name, color, tier)
  }, [addZone, setShowAddZone])

  return (
    <div className="DataInput">
      <div>
      <button onClick={() => setShowAddZone(c => !c)}>{showAddZone ? "Hide" : "Add missing zone"}</button>
      <select onChange={(e) => setFrom(e.target.value)}>
        <option value="">Select from</option>
        {filteredFrom.map((id) => (
          <option key={id}>{id}</option>
        ))}
      </select>
      <select onChange={(e) => setTo(e.target.value)}>
        <option value="">Select to</option>
        {filteredTo.map((id) => (
          <option key={id}>{id}</option>
        ))}
      </select>

      <select onChange={(e) => setSize(parseInt(e.target.value) as PortalSize)}>
        {[2, 7, 20].map((alt) => (
          <option key={alt}>{alt}</option>
        ))}
      </select>

      <span>Remaining hours</span>
      <input type="number" value={hours} onChange={e => setHours(parseInt(e.target.value))} />

      <span>minutes</span>
      <input type="number" value={minutes} onChange={e => setMinutes(parseInt(e.target.value))} />

      <button onClick={submit}>Add</button>
      </div>
        {showAddZone && 
          <AddZoneForm addZone={addZoneAndCloseForm} /> 
        }
    </div>
  );
}

export default DataInput;