import { RecordStatus } from './RecordStatus';

export type RecordElementType = {
  number: number;
  datetime: number; // getting number using Date.now()
  companyName: string;
  clientName: string;
  clientPhone: string;
  comment: string;
  status: RecordStatus;
  atiCode: number;
};
