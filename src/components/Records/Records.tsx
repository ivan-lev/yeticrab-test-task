import './Records.scss';

import RecordElement from '../RecordElement/RecordElement';

import { records } from '../../variables/records';

export default function Records(): JSX.Element {
  return (
    <ul>
      {records.map(record => (
        <RecordElement record={record} />
      ))}
    </ul>
  );
}
