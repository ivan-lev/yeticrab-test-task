import './Records.scss';

// Hooks
import { useState, SetStateAction, Dispatch } from 'react';

// Components
import ModalWindow from '../ModalWindow/ModalWindow';
import RecordsCounter from '../RecordsCounter/RecordsCounter';

// Gravitu IU components
import { Button, Link, Table, TableDataItem, withTableActions } from '@gravity-ui/uikit';

// Utils
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';
import { RecordStatusEnum } from '../../types/RecordStatus';

import { CirclePlus } from '@gravity-ui/icons';

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
      [AtiCode]:
        record.atiCode === undefined ? (
          'нет кода'
        ) : (
          <Link href={getAtiLink(record.atiCode)} target="_blank">
            {record.atiCode}
          </Link>
        )
    };
  });

  const getRowActions = () => {
    return isAdminMode
      ? [
          {
            text: BUTTON_NAMES.EDIT_ORDER,
            handler: (item: TableDataItem) => {
              openOrder(item);
            },
            theme: 'normal' as const
          },
          {
            text: BUTTON_NAMES.DELETE_ORDER,
            handler: (item: TableDataItem) => {
              deleteRecord(item);
            },
            theme: 'danger' as const
          }
        ]
      : [];
  };

  const openOrder = (item: TableDataItem) => {
    const currentRecord = records.find(record => record.number === item.id);
    setOpenedOrder(currentRecord ?? emptyOrderElement);
    setIsModalOpened(true);
  };

  const openEmptyOrder = () => {
    setIsNewOrder(true);
    const currentRecord = emptyOrderElement;
    currentRecord.status = RecordStatusEnum.new;
    setOpenedOrder(currentRecord);
    setIsModalOpened(true);
  };

  const closeOrder = () => {
    setIsModalOpened(false);
    setOpenedOrder(emptyOrderElement);
    isNewOrder && setIsNewOrder(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setOpenedOrder({ ...openedOrder, [name]: value });
  };

  const saveRecord = () => {
    let newRecords: RecordElementType[] = [];

    records.forEach(record => {
      if (record.number !== openedOrder.number) {
        newRecords.push(record);
      }
      if (record.number === openedOrder.number) {
        newRecords.push(openedOrder);
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
    <div className="records">
      <MyTable
        className="records__table"
        data={data}
        columns={columns}
        getRowActions={getRowActions}
      />
      <div className="records__bottom">
        <RecordsCounter amount={records?.length || 0} />
        {isAdminMode && (
          <Button onClick={openEmptyOrder}>
            <span className="button-content">
              <CirclePlus />
              {BUTTON_NAMES.ADD_ORDER}
            </span>
          </Button>
        )}
      </div>

      <ModalWindow
        isModalOpened={isModalOpened}
        closeOrder={closeOrder}
        openedOrder={openedOrder}
        handleChange={handleChange}
        setNewRecordStatus={setNewRecordStatus}
        isNewOrder={isNewOrder}
        saveRecord={saveRecord}
        addNewRecord={addNewRecord}
      />
    </div>
  );
}
