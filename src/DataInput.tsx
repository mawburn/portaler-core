import React, { useState, useCallback } from 'react'
import { PortalSize } from './types'

interface DataInputProps {
  from: string | null
  setFrom: (s: string) => void
  existingNames: string[]
  addPortal: (
    source: string,
    target: string,
    size: PortalSize,
    hours: number,
    minutes: number
  ) => void
}

const sorter = (a: any, b: any) => {
  if (a < b) return -1
  if (a === b) return 0
  return 1
}

const DataInput: React.FC<DataInputProps> = ({
  existingNames,
  addPortal,
  from,
  setFrom,
}) => {
  const [to, setTo] = useState('')
  const [size, setSize] = useState<PortalSize>(2)
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)

  const sortedNames = existingNames.sort(sorter)

  const filteredFrom = sortedNames //.filter(id => from.length < 1 || id.indexOf(from) === 0)
  const filteredTo = sortedNames //.filter(id => to.length < 1 || id.indexOf(to) === 0)

  const submit = useCallback(() => {
    if (from && to) {
      addPortal(from, to, size, hours, minutes)
    }
  }, [from, to, size, hours, minutes, addPortal])

  return (
    <div className="DataInput">
      <div>
        <select
          value={from || ''}
          onChange={(e) => setFrom(e.target.value || '')}
        >
          <option value="">Select from</option>
          {filteredFrom.map((id) => (
            <option key={id}>{id}</option>
          ))}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Select to</option>
          {filteredTo.map((id) => (
            <option key={id}>{id}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSize(parseInt(e.target.value) as PortalSize)}
        >
          {[2, 7, 20].map((alt) => (
            <option key={alt}>{alt}</option>
          ))}
        </select>

        <span>Remaining hours</span>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
        />

        <span>minutes</span>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />

        <button onClick={submit}>Add</button>
      </div>
    </div>
  )
}

export default DataInput
