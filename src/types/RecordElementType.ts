import { RecordStatus } from './RecordStatus';

export type RecordElementType = {
  number: number;
  datetime: string; // date time string format with toISOString() method
  companyName: string;
  clientName: string;
  phone: string;
  comment: string;
  status: RecordStatus;
  atiCode: number;
};
