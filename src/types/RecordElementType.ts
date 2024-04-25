export interface RecordElementType {
  number: number | undefined;
  datetime: string | undefined; // date time string format with toISOString() method
  clientsFirm: string | undefined;
  shipperName: string | undefined;
  shipperPhone: string | undefined;
  comment?: string | undefined;
  status: string | undefined;
  atiCode: number | undefined;
}
