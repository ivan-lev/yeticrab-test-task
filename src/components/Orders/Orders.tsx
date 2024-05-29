import './Orders.scss';

// React hooks
import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { addOrder, editOrder, deleteOrder } from '../../slices/ordersSlice';
import { openModal, closeModal } from '../../slices/modalSlice';

// Components
import ModalWindow from '../ModalWindow/ModalWindow';
import OrdersCounter from '../OrdersCounter/OrdersCounter';

// Gravitu IU components
import { Button, Link, Table, TableDataItem, withTableActions } from '@gravity-ui/uikit';
import { CirclePlus } from '@gravity-ui/icons';

// Utils
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';
import { validators } from '../../utils/validator';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { OrderElementType } from '../../types/OrderElementType';
import { OrderStatusEnum } from '../../types/OrderStatus';

export default function Orders(): JSX.Element {
  const emptyOrderElement: OrderElementType = {
    number: undefined,
    datetime: undefined,
    clientsFirm: undefined,
    shipperName: undefined,
    shipperPhone: '+7',
    comment: undefined,
    status: undefined,
    atiCode: undefined
  };

  const [openedOrder, setOpenedOrder] = useState<OrderElementType>(emptyOrderElement);
  const [isNewOrder, setIsNewOrder] = useState<boolean>(false);

  const [isInputsValid, setIsInputsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();
  const isUserAdmin = useSelector((state: RootState) => state.users.isUserAdmin);
  const orders = useSelector((state: RootState) => state.orders.ordersArray);

  // this function is checking inputs via validators,
  // set the error message
  // and return boolean error status
  const validityCheck = (openedOrder: OrderElementType): boolean => {
    const { clientsFirm, shipperName, shipperPhone, atiCode } = openedOrder;
    const errorsArray = [];
    errorsArray.push(validators.clientsFirmValidator(clientsFirm || ''));
    errorsArray.push(validators.shipperNameValidator(shipperName || ''));
    errorsArray.push(validators.shipperPhoneValidator(shipperPhone || ''));
    errorsArray.push(validators.atiCodeValidator(atiCode));

    let errorMessages: string[] = [];
    errorsArray.forEach(error => {
      if (error.errorMessage.length !== 0) {
        errorMessages.push(error.errorMessage);
      }
    });
    setErrorMessage(errorMessages.join(', '));

    let isErrors: boolean = errorsArray.some(error => error.isValid === false);
    if (isErrors) {
      setIsInputsValid(false);
    } else {
      setIsInputsValid(true);
    }
    return isErrors;
  };

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

  const data = orders.map(record => {
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
    return isUserAdmin
      ? [
          {
            text: BUTTON_NAMES.EDIT_ORDER,
            handler: (item: TableDataItem) => {
              openOrderInModal(item);
            },
            theme: 'normal' as const
          },
          {
            text: BUTTON_NAMES.DELETE_ORDER,
            handler: (item: TableDataItem) => {
              dispatch(deleteOrder(item));
            },
            theme: 'danger' as const
          }
        ]
      : [];
  };

  const openOrderInModal = (item: TableDataItem): void => {
    setErrorMessage('');
    setIsInputsValid(false);
    const currentOrder = orders.find(record => record.number === item.id);
    setOpenedOrder(currentOrder ?? emptyOrderElement);
    dispatch(openModal());
  };

  const openEmptyOrderInModal = (): void => {
    setErrorMessage('');
    setIsInputsValid(false);
    setIsNewOrder(true);
    const currentOrder = emptyOrderElement;
    currentOrder.status = OrderStatusEnum.new;
    setOpenedOrder(currentOrder);
    dispatch(openModal());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = event.target;
    setOpenedOrder({ ...openedOrder, [name]: value });
    setIsInputsValid(true);
  };

  const handleEditOrder = (): void => {
    const isErrors: boolean = validityCheck(openedOrder);
    if (isErrors) {
      return;
    }
    dispatch(editOrder(openedOrder));
    dispatch(closeModal());
  };

  const handleAddNewOrder = (): void => {
    const isErrors: boolean = validityCheck(openedOrder);
    if (isErrors) {
      return;
    }
    dispatch(addOrder(openedOrder));
    dispatch(closeModal());
  };

  const setNewOrderStatus = (event: any): void => {
    setOpenedOrder({ ...openedOrder, status: event[0] });
    if (!isInputsValid) {
      setIsInputsValid(true);
    }
  };

  return (
    <div className="orders">
      <MyTable
        className="orders__table"
        data={data}
        columns={columns}
        getRowActions={getRowActions}
      />
      <div className="orders__bottom">
        <OrdersCounter amount={orders?.length || 0} />
        {isUserAdmin && (
          <Button onClick={openEmptyOrderInModal}>
            <span className="button-content">
              <CirclePlus />
              {BUTTON_NAMES.ADD_ORDER}
            </span>
          </Button>
        )}
      </div>

      <ModalWindow
        openedOrder={openedOrder}
        setOpenedOrder={setOpenedOrder}
        handleChange={handleChange}
        setNewOrderStatus={setNewOrderStatus}
        isNewOrder={isNewOrder}
        saveOrder={handleEditOrder}
        addNewOrder={handleAddNewOrder}
        isInputsValid={isInputsValid}
        errorMessage={errorMessage}
      />
    </div>
  );
}
