import './App.css';

import { useState } from 'react';

import Records from '../Records/Records';
import RecordsCounter from '../RecordsCounter/RecordsCounter';

import { templateRecords } from '../../variables/templateRecords';

function App() {
  const [records, setRecords] = useState(templateRecords);
  return (
    <>
      <div>Текущие заявки</div>
      <Records records={records} setRecords={setRecords} />
      <RecordsCounter amount={records?.length || 0} />
    </>
  );
}

export default App;
