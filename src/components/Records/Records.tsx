import './Records.scss';

//hooks
import { useState, SetStateAction, Dispatch } from 'react';

//components
import {
  Table,
  Link,
  Modal,
  TextInput,
  Button,
  Select,
  withTableActions,
  TableDataItem
} from '@gravity-ui/uikit';

//utils and variables
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';

//types
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';
import { RecordStatus } from '../../types/RecordStatus';

export default function Records({
  records,
  setRecords
}: {
  records: RecordElementType[];
  setRecords: Dispatch<SetStateAction<RecordElementType[]>>;
}): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [openedOrder, setOpenedOrder] = useState<RecordElementType>({
    number: undefined,
    datetime: undefined,
    clientsFirm: undefined,
    shipperName: undefined,
    shipperPhone: undefined,
    comment: undefined,
    status: undefined,
    atiCode: undefined
  });

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
    return [
      // {
      //   text: 'Print',
      //   handler: (item: TableDataItem) => {
      //     console.log(item);
      //   }
      // },
      {
        text: 'Редактировать',
        handler: (item: TableDataItem) => {
          openModal(item);
        }
      },
      {
        text: 'Удалить',
        handler: (item: TableDataItem) => {
          deleteRecord(item);
        },
        theme: 'danger'
      }
    ];
  };

  const openModal = (item: TableDataItem) => {
    const currentRecord = records.find(record => record.number === item.id);
    setOpenedOrder(currentRecord);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    setOpenedOrder({});
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
    closeModal();
  };

  const deleteRecord = (item: TableDataItem) => {
    const newRecords = records.filter(record => record.number !== item.id);
    setRecords(newRecords);
  };

  const setNewRecordStatus = event => {
    setOpenedOrder({ ...openedOrder, status: event[0] });
  };

  return (
    <>
      <MyTable data={data} columns={columns} getRowActions={getRowActions} />
      <Modal open={isModalOpened} onClose={closeModal}>
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
        {/* <TextInput
          label={Status}
          value={openedOrder?.status}
          name="status"
          onChange={handleChange}
        /> */}
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
        <Button view="outlined-warning" onClick={closeModal}>
          Закрыть
        </Button>
        <Button view="outlined-success" onClick={saveRecord}>
          Сохранить
        </Button>
      </Modal>
    </>
  );
}
