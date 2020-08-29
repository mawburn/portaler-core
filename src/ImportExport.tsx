import React, { useCallback, useState } from 'react';


interface ImportExportProps {
  rawData: string;
  importData: (raw: string) => void;
}

const ImportExport: React.FC<ImportExportProps> = ({rawData, importData}) => {
  const [show, setShow] = useState(false);

  const [importInput, setImportInput] = useState("");
  const triggerImport = useCallback(() => {
    importData(importInput);
  }, [importInput, importData])

  return <div className="importExport">
    <button onClick={() => setShow(old => !old)}>Show/Hide</button>
    {show && <>
      <div className="export">
        <h4>Export</h4>
        <p>Copy the stuff below to your friend</p>
        <textarea disabled value={rawData}></textarea>
      </div>
      <div className="import">
        <h4>Import</h4>
        <p>Paste exported data below to import. This will overwrite your current data!</p>
        <textarea value={importInput} onChange={e => setImportInput(e.target.value)}></textarea>
        <button onClick={triggerImport}>Import</button>
      </div>
    </>}
  </div>
}

export default ImportExport;