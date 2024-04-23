import './Records.scss';

//hooks
import { useState } from 'react';

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
}): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<RecordElementType>({
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
    setModalContent(currentRecord);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    setModalContent({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setModalContent({ ...modalContent, [name]: value });
  };

  const saveRecord = () => {
    const newRecords = records.map(record => {
      if (record.number !== modalContent.number) {
        return record;
      }
      if (record.number === modalContent.number) {
        return modalContent;
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
    setModalContent({ ...modalContent, status: event[0] });
  };

  return (
    <>
      <MyTable data={data} columns={columns} getRowActions={getRowActions} />
      <Modal open={isModalOpened} onClose={closeModal}>
        <TextInput label={Number} disabled={true} value={modalContent?.number?.toString()} />
        <TextInput label={DateTime} disabled={true} value={modalContent?.datetime} />
        <TextInput
          label={ClientsFirm}
          value={modalContent?.clientsFirm}
          name="clientsFirm"
          onChange={handleChange}
        />
        <TextInput
          label={Shipper}
          value={modalContent?.shipperName}
          name="shipperName"
          onChange={handleChange}
        />
        <TextInput
          label={ShipperNumber}
          value={modalContent?.shipperPhone}
          name="shipperPhone"
          onChange={handleChange}
        />
        <TextInput
          label={Comment}
          value={modalContent?.comment}
          name="comment"
          onChange={handleChange}
        />
        {/* <TextInput
          label={Status}
          value={modalContent?.status}
          name="status"
          onChange={handleChange}
        /> */}
        <Select
          placeholder={modalContent?.status}
          onUpdate={setNewRecordStatus}
          options={[
            { content: 'новая', value: 'новая' },
            { content: 'в процессе', value: 'в процессе' },
            { content: 'завершенная', value: 'завершенная' }
          ]}
        />
        <TextInput
          label={AtiCode}
          value={modalContent?.atiCode?.toString()}
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
