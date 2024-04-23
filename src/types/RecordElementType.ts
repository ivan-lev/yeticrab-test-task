// import { RecordStatus, RecordStatusEnum } from './RecordStatus';

import { RecordStatus } from './RecordStatus';

export interface RecordElementType {
  number: number | undefined;
  datetime: string | undefined; // date time string format with toISOString() method
  clientsFirm: string | undefined;
  shipperName: string | undefined;
  shipperPhone: string | undefined;
  comment?: string | undefined;
  status: RecordStatus | undefined;
  atiCode: number | undefined;
}
