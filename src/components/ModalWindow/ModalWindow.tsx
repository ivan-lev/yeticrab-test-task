import './ModalWindow.scss';

// Gravity UI components
import { Button, Modal, Select, TextInput } from '@gravity-ui/uikit';

// Utils and variables
import { getDate } from '../../utils/getDate';

// Types and interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';

export default function ModalWindow({
  isModalOpened,
  closeOrder,
  openedOrder,
  handleChange,
  setNewRecordStatus,
  isNewOrder,
  saveRecord,
  addNewRecord
}: {
  isModalOpened: boolean;
  closeOrder: () => void;
  openedOrder: RecordElementType;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setNewRecordStatus: (event: any) => void;
  isNewOrder: boolean;
  saveRecord: () => void;
  addNewRecord: () => void;
}): JSX.Element {
  const { Number, DateTime, ClientsFirm, Shipper, ShipperNumber, Comment, Status, AtiCode } =
    tableColumnsEnum;
  return (
    <Modal open={isModalOpened} onClose={closeOrder}>
      <div className="modal-window">
        <TextInput label={Number} disabled={true} value={openedOrder?.number?.toString()} />
        <TextInput label={DateTime} disabled={true} value={getDate(openedOrder?.datetime)} />
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
  );
}
