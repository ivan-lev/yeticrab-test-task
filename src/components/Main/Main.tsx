import './Main.scss';

// React components
import { Dispatch, SetStateAction } from 'react';

// Components
import Records from '../Records/Records';

// Gravity UI components
import { Text } from '@gravity-ui/uikit';

// Types, interfaces
import { RecordElementType } from '../../types/RecordElementType';

export default function Main({
  records,
  setRecords,
  isAdminMode,
  latestRecordNumber,
  setLatestRecordNumber
}: {
  records: RecordElementType[];
  setRecords: Dispatch<SetStateAction<RecordElementType[]>>;
  isAdminMode: boolean;
  latestRecordNumber: number;
  setLatestRecordNumber: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  return (
    <main className="content">
      <Text variant="header-1">Текущие заявки</Text>
      <Records
        records={records}
        setRecords={setRecords}
        isAdminMode={isAdminMode}
        latestRecordNumber={latestRecordNumber}
        setLatestRecordNumber={setLatestRecordNumber}
      />
    </main>
  );
}
