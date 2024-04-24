import './App.scss';

// Hooks
import { useState } from 'react';

// Components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

// Variables, types, interfaces
import { templateRecords } from '../../variables/templateRecords';
import { RecordElementType } from '../../types/RecordElementType';

export default function App() {
  const [records, setRecords] = useState<RecordElementType[]>(templateRecords);
  const [latestRecordNumber, setLatestRecordNumber] = useState<number>(129);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  return (
    <>
      <Header isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode}></Header>
      <Main
        records={records}
        setRecords={setRecords}
        isAdminMode={isAdminMode}
        latestRecordNumber={latestRecordNumber}
        setLatestRecordNumber={setLatestRecordNumber}
      />
      <Footer />
    </>
  );
}
