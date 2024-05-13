import './ModalWindow.scss';

// React hooks
import { useState, Dispatch, SetStateAction } from 'react';

// Gravity UI components
import { Button, Modal, Select, Text, TextArea, TextInput } from '@gravity-ui/uikit';
import { CirclePlus, CircleXmark, FloppyDisk } from '@gravity-ui/icons';

// Utils
import { getDate } from '../../utils/getDate';
// import { validators } from '../../utils/validator';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { OrderElementType } from '../../types/OrderElementType';
import { OrderStatusEnum } from '../../types/OrderStatus';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

export default function ModalWindow({
  isModalOpened,
  closeModal,
  openedOrder,
  handleChange,
  setNewOrderStatus,
  isNewOrder,
  saveOrder,
  addNewOrder,
  isInputsValid,
  errorMessage
}: {
  isModalOpened: boolean;
  closeModal: () => void;
  openedOrder: OrderElementType;
  setOpenedOrder: Dispatch<SetStateAction<OrderElementType>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setNewOrderStatus: (event: any) => void;
  isNewOrder: boolean;
  saveOrder: () => void;
  addNewOrder: () => void;
  isInputsValid: boolean;
  errorMessage: string;
}): JSX.Element {
  // const [orderValidity, setOrderValidity] = useState<boolean>();
  // const [errorMessage, setErrorMessage] = useState<string>('');

  const { Number, DateTime, ClientsFirm, Shipper, ShipperNumber, Comment, Status, AtiCode } =
    tableColumnsEnum;

  // make array of options objects to show in available statuses
  const statusOptionsArray = Object.values(OrderStatusEnum).map(status => {
    return { content: status, value: status };
  });

  // const validityCheck = (): void => {
  //   const { clientsFirm, shipperName, shipperPhone, atiCode } = openedOrder;
  //   const errorsArray = [];
  //   errorsArray.push(validators.clientsFirmValidator(clientsFirm || ''));
  //   errorsArray.push(validators.shipperNameValidator(shipperName || ''));
  //   errorsArray.push(validators.shipperPhoneValidator(shipperPhone || ''));
  //   errorsArray.push(validators.atiCodeValidator(atiCode));
  //   let errorMessages: string[] = [];
  //   errorsArray.forEach(error => {
  //     if (error.errorMessage.length !== 0) {
  //       errorMessages.push(error.errorMessage);
  //     }
  //   });

  //   let errorStatus: boolean = errorsArray.every(error => error.isValid === true);
  //   console.log(errorStatus);
  //   setErrorMessage(errorMessages.join(', '));
  // };

  return (
    <Modal open={isModalOpened} onClose={closeModal}>
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
            onUpdate={setNewOrderStatus}
            options={statusOptionsArray}
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
          <Button className="modal-window__button" view="outlined-warning" onClick={closeModal}>
            <span className="button-content">
              <CircleXmark />
              {BUTTON_NAMES.CLOSE}
            </span>
          </Button>
          <Button
            className="button modal-window__button"
            view="outlined-success"
            width="max"
            onClick={!isNewOrder ? saveOrder : addNewOrder}
            disabled={!isInputsValid ? true : false}
            // onClick={validityCheck}
          >
            {!isNewOrder ? (
              <span className="button-content">
                <FloppyDisk />
                {BUTTON_NAMES.SAVE}
              </span>
            ) : (
              <span className="button-content">
                <CirclePlus />
                {BUTTON_NAMES.ADD_ORDER}
              </span>
            )}
          </Button>
        </div>
        <Text className="modal-window__error" whiteSpace={'break-spaces'}>
          {isInputsValid ? `` : `Ошибка: ${errorMessage}`}
        </Text>
      </div>
    </Modal>
  );
}
