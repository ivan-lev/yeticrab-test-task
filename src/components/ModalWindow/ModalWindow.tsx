import './ModalWindow.scss';

// Gravity UI components
import { Button, Modal, Select, TextArea, TextInput } from '@gravity-ui/uikit';

// Utils
import { getDate } from '../../utils/getDate';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { RecordElementType } from '../../types/RecordElementType';
import { RecordStatusEnum } from '../../types/RecordStatus';

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
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setNewRecordStatus: (event: any) => void;
  isNewOrder: boolean;
  saveRecord: () => void;
  addNewRecord: () => void;
}): JSX.Element {
  const { Number, DateTime, ClientsFirm, Shipper, ShipperNumber, Comment, Status, AtiCode } =
    tableColumnsEnum;

  // make array of options objects to show in available statuses
  const statusOptionsArray = Object.values(RecordStatusEnum).map(status => {
    return { content: status, value: status };
  });

  return (
    <Modal open={isModalOpened} onClose={closeOrder}>
      <div className="modal-window">
        <TextInput
          className="modal-window__number"
          label={Number}
          disabled={true}
          value={openedOrder?.number?.toString()}
        />
        <TextInput
          className="modal-window__date-time"
          label={DateTime}
          disabled={true}
          value={getDate(openedOrder?.datetime)}
        />
        <TextInput
          className="modal-window__clients-firm"
          label={ClientsFirm}
          value={openedOrder?.clientsFirm}
          name="clientsFirm"
          onChange={handleChange}
        />
        <TextInput
          className="modal-window__shipper-name"
          label={Shipper}
          value={openedOrder?.shipperName}
          name="shipperName"
          onChange={handleChange}
        />
        <TextInput
          className="modal-window__shipper-phone"
          label={ShipperNumber}
          value={openedOrder?.shipperPhone}
          name="shipperPhone"
          onChange={handleChange}
        />
        <div className="modal-window__comment">
          <span>{Comment}:</span>
          <TextArea rows={2} value={openedOrder?.comment} name="comment" onChange={handleChange} />
        </div>
        <div>
          {Status}
          <span>: </span>
          <Select
            className="modal-window__status"
            placeholder={openedOrder?.status}
            onUpdate={setNewRecordStatus}
            options={statusOptionsArray}
            // options={[
            //   { content: 'новая', value: 'новая' },
            //   { content: 'в процессе', value: 'в процессе' },
            //   { content: 'завершенная', value: 'завершенная' }
            // ]}
          />
        </div>

        <TextInput
          className="modal-window__ati-code"
          label={AtiCode}
          value={openedOrder?.atiCode?.toString()}
          name="atiCode"
          onChange={handleChange}
        />
        <div className="modal-window__buttons">
          <Button view="outlined-warning" onClick={closeOrder}>
            Закрыть
          </Button>
          <Button
            view="outlined-success"
            width="max"
            onClick={!isNewOrder ? saveRecord : addNewRecord}
          >
            {`${!isNewOrder ? 'Сохранить' : 'Добавить'}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
