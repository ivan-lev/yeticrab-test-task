import './ModalWindow.scss';

// React
import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  setShowErrorInModal,
  setValidityAndErrors,
  setButtonBlockedStatus,
  setIsDataEdited
} from '../../slices/modalSlice';
import { RootState } from '../../slices';
import { setOpenedOrder } from '../../slices/ordersSlice';

// Gravity UI components
import { Button, Modal, Select, Text, TextArea, TextInput } from '@gravity-ui/uikit';
import { CirclePlus, CircleXmark, FloppyDisk } from '@gravity-ui/icons';

// Utils
import { getDate } from '../../utils/getDate';
import { maskPhoneNumber } from '../../utils/maskPhoneNumber';
import { maskAtiCode } from '../../utils/maskAtiCode';
import { checkValidity } from '../../utils/checkValidity';
import { handleAddNewOrder } from '../../utils/orders/handleAddNewOrder';
import { handleUpdateOrder } from '../../utils/orders/handleUpdateOrder';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { OrderStatusEnum } from '../../types/OrderStatus';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

export default function ModalWindow(): JSX.Element {
  const { Number, DateTime, ClientsFirm, Shipper, ShipperNumber, Comment, Status, AtiCode } =
    tableColumnsEnum;

  const dispatch = useDispatch();
  const isNewOrder = useSelector((state: RootState) => state.orders.isNewOrder);
  const openedOrder = useSelector((state: RootState) => state.orders.openedOrder);

  const isErrorShown = useSelector((state: RootState) => state.modal.isErrorShown);
  const isModalOpened = useSelector((state: RootState) => state.modal.isModalOpened);
  const isErrors = useSelector((state: RootState) => state.modal.isErrors);
  const errorMessage = useSelector((state: RootState) => state.modal.errorMessage);
  const isButtonBlocked = useSelector((state: RootState) => state.modal.isButtonBlocked);
  const isDataEdited = useSelector((state: RootState) => state.modal.isDataEdited);

  useEffect(() => {
    if (isModalOpened && isDataEdited) {
      const validityState = checkValidity(openedOrder);
      dispatch(setValidityAndErrors(validityState));
    }
  }, [openedOrder, isModalOpened, isDataEdited]);

  useEffect(() => {
    if (isModalOpened && isErrors) {
      dispatch(setShowErrorInModal(true));
      dispatch(setButtonBlockedStatus(true));
    }

    if (isModalOpened && !isErrors && isDataEdited) {
      dispatch(setShowErrorInModal(false));
      dispatch(setButtonBlockedStatus(false));
    }
  }, [isErrors, isModalOpened, isDataEdited]);

  // make array of options objects to show in available statuses
  const statusOptionsArray = Object.values(OrderStatusEnum).map(status => {
    return { content: status, value: status };
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = event.target;
    dispatch(setOpenedOrder({ ...openedOrder, [name]: value }));
    dispatch(setIsDataEdited(true));
  };

  const handleMaskPhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let phoneNumber: string = event.target.value;
    let returnedPhone = maskPhoneNumber(phoneNumber);
    event.target.value = returnedPhone;
    handleChange(event);
  };

  const handleMaskAtiCode = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let atiCode: string = event.target.value;
    let returnedAtiCode = maskAtiCode(atiCode);
    event.target.value = returnedAtiCode;
    handleChange(event);
  };

  return (
    <Modal open={isModalOpened} onClose={() => dispatch(closeModal())}>
      <div className="modal-window">
        <TextInput
          className="modal-window__number"
          label={Number}
          disabled={true}
          value={openedOrder?.number?.toString() || ''}
        />
        <TextInput
          className="modal-window__date-time"
          label={DateTime}
          disabled={true}
          value={getDate(openedOrder?.datetime) || ''}
        />
        <TextInput
          className="modal-window__clients-firm"
          label={ClientsFirm}
          value={openedOrder?.clientsFirm || ''}
          name="clientsFirm"
          onChange={handleChange}
        />
        <TextInput
          className="modal-window__shipper-name"
          label={Shipper}
          value={openedOrder?.shipperName || ''}
          name="shipperName"
          onChange={handleChange}
        />
        <TextInput
          className="modal-window__shipper-phone"
          label={ShipperNumber}
          value={openedOrder?.shipperPhone || ''}
          name="shipperPhone"
          onChange={handleMaskPhoneNumber}
        />
        <div className="modal-window__comment">
          <span>{Comment}:</span>
          <TextArea
            rows={2}
            value={openedOrder?.comment || ''}
            name="comment"
            onChange={handleChange}
          />
        </div>
        <div>
          {Status}
          <span>: </span>
          <Select
            className="modal-window__status"
            placeholder={openedOrder?.status}
            onUpdate={event => dispatch(setOpenedOrder({ ...openedOrder, status: event[0] }))}
            options={statusOptionsArray}
            value={[openedOrder.status]}
          />
        </div>

        <TextInput
          className="modal-window__ati-code"
          label={AtiCode}
          value={openedOrder?.atiCode?.toString() || ''}
          name="atiCode"
          onChange={handleMaskAtiCode}
        />
        <div className="modal-window__buttons">
          <Button
            className="modal-window__button"
            view="outlined-warning"
            onClick={() => dispatch(closeModal())}
          >
            <span className="button-content">
              <CircleXmark />
              {BUTTON_NAMES.CLOSE}
            </span>
          </Button>
          <Button
            className="button modal-window__button"
            view="outlined-success"
            width="max"
            onClick={
              !isNewOrder
                ? () => {
                    handleUpdateOrder(dispatch, openedOrder);
                  }
                : () => {
                    handleAddNewOrder(dispatch, openedOrder);
                  }
            }
            disabled={isButtonBlocked}
          >
            <span className="button-content">
              {!isNewOrder ? (
                <>
                  <FloppyDisk />
                  {BUTTON_NAMES.SAVE}
                </>
              ) : (
                <>
                  <CirclePlus />
                  {BUTTON_NAMES.ADD_ORDER}
                </>
              )}
            </span>
          </Button>
        </div>
        <Text className="modal-window__error" whiteSpace={'break-spaces'}>
          {isErrorShown && `Ошибка: ${errorMessage}`}
        </Text>
      </div>
    </Modal>
  );
}
