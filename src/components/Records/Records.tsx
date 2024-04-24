import './Records.scss';

//Рooks
import { useState, SetStateAction, Dispatch } from 'react';

//Components
import RecordsCounter from '../RecordsCounter/RecordsCounter';

//Gravitu IU components
import {
  Button,
  Link,
  Modal,
  Table,
  TableDataItem,
  TextInput,
  Select,
  withTableActions
} from '@gravity-ui/uikit';

//utils and variables
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';

//types
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';

export default function Records({
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
  const emptyOrderElement: RecordElementType = {
    number: undefined,
    datetime: undefined,
    clientsFirm: undefined,
    shipperName: undefined,
    shipperPhone: undefined,
    comment: undefined,
    status: undefined,
    atiCode: undefined
  };

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [openedOrder, setOpenedOrder] = useState<RecordElementType>(emptyOrderElement);
  const [isNewOrder, setIsNewOrder] = useState<boolean>(false);

  const MyTable = withTableActions(Table);

  const { Number, DateTime, ClientsFirm, Shipper, ShipperNumber, Comment, Status, AtiCode } =
    tableColumnsEnum;

  const columns = [
    { id: Number },
    { id: DateTime },
    { id: ClientsFirm },
    { id: Shipper },
    { id: ShipperNumber },
    { id: Comment },
    { id: Status },
    { id: AtiCode }
  ];

  const data = records.map(record => {
    return {
      id: record.number,
      [Number]: record.number,
      [DateTime]: getDate(record.datetime),
      [ClientsFirm]: record.clientsFirm,
      [Shipper]: record.shipperName,
      [ShipperNumber]: record.shipperPhone,
      [Comment]: record.comment,
      [Status]: record.status,
      [AtiCode]: (
        <Link href={getAtiLink(record.atiCode)} target="_blank">
          {record.atiCode}
        </Link>
      )
    };
  });

  const getRowActions = () => {
    return isAdminMode
      ? [
          // {
          //   text: 'Print',
          //   handler: (item: TableDataItem) => {
          //     console.log(item);
          //   }
          // },
          {
            text: 'Редактировать',
            handler: (item: TableDataItem) => {
              openOrder(item);
            }
          },
          {
            text: 'Удалить',
            handler: (item: TableDataItem) => {
              deleteRecord(item);
            },
            theme: 'danger'
          }
        ]
      : [];
  };

  const openOrder = (item: TableDataItem) => {
    const currentRecord = records.find(record => record.number === item.id);
    setOpenedOrder(currentRecord);
    setIsModalOpened(true);
  };

  const openEmptyOrder = () => {
    setIsNewOrder(true);
    const currentRecord = emptyOrderElement;
    setOpenedOrder(currentRecord);
    setIsModalOpened(true);
  };

  const closeOrder = () => {
    setIsModalOpened(false);
    setOpenedOrder(emptyOrderElement);
    isNewOrder && setIsNewOrder(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setOpenedOrder({ ...openedOrder, [name]: value });
  };

  const saveRecord = () => {
    const newRecords = records.map(record => {
      if (record.number !== openedOrder.number) {
        return record;
      }
      if (record.number === openedOrder.number) {
        return openedOrder;
      }
    });
    setRecords(newRecords);
    closeOrder();
  };

  const addNewRecord = () => {
    openedOrder.number = latestRecordNumber;
    const currentTime = new Date();
    openedOrder.datetime = currentTime.toISOString();
    setLatestRecordNumber(latestRecordNumber + 1);
    const newRecords = [...records, openedOrder];
    setRecords(newRecords);
    closeOrder();
  };

  const deleteRecord = (item: TableDataItem) => {
    const newRecords = records.filter(record => record.number !== item.id);
    setRecords(newRecords);
  };

  const setNewRecordStatus = (event: any): void => {
    setOpenedOrder({ ...openedOrder, status: event[0] });
  };

  return (
    <>
      <MyTable
        className="records__table"
        data={data}
        columns={columns}
        getRowActions={getRowActions}
      />
      <div className="records__bottom">
        <RecordsCounter amount={records?.length || 0} />
        {isAdminMode && <Button onClick={openEmptyOrder}>Добавить заявку</Button>}
      </div>

      <Modal open={isModalOpened} onClose={closeOrder}>
        <div className="records__modal">
          <TextInput label={Number} disabled={true} value={openedOrder?.number?.toString()} />
          <TextInput label={DateTime} disabled={true} value={openedOrder?.datetime} />
          <TextInput
            label={ClientsFirm}
            value={openedOrder?.clientsFirm}
            name="clientsFirm"
            onChange={handleChange}
          />
          <TextInput
            label={Shipper}
            value={openedOrder?.shipperName}
            name="shipperName"
            onChange={handleChange}
          />
          <TextInput
            label={ShipperNumber}
            value={openedOrder?.shipperPhone}
            name="shipperPhone"
            onChange={handleChange}
          />
          <TextInput
            label={Comment}
            value={openedOrder?.comment}
            name="comment"
            onChange={handleChange}
          />
          <Select
            placeholder={openedOrder?.status}
            onUpdate={setNewRecordStatus}
            options={[
              { content: 'новая', value: 'новая' },
              { content: 'в процессе', value: 'в процессе' },
              { content: 'завершенная', value: 'завершенная' }
            ]}
          />
          <TextInput
            label={AtiCode}
            value={openedOrder?.atiCode?.toString()}
            name="atiCode"
            onChange={handleChange}
          />
          <Button view="outlined-warning" onClick={closeOrder}>
            Закрыть
          </Button>
          <Button view="outlined-success" onClick={!isNewOrder ? saveRecord : addNewRecord}>
            {`${!isNewOrder ? 'Сохранить' : 'Добавить'}`}
          </Button>
        </div>
      </Modal>
    </>
  );
}
