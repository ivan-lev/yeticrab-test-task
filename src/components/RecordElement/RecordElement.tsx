import './RecordElement.scss';

import { RecordElementType } from '../../types/RecordElementType';

export default function RecordElement({ record }: { record: RecordElementType }): JSX.Element {
  return (
    <li>
      <div>{record.number}</div>
      <div>{record.datetime}</div>
      <div>{record.companyName}</div>
      <div>{record.clientName}</div>
      <div>{record.clientPhone}</div>
      <div>{record.comment}</div>
      <div>{record.status}</div>
      <div>{record.atiCode}</div>
    </li>
  );
}
