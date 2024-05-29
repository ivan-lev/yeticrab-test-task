import './Orders.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import {
  addOrder,
  editOrder,
  deleteOrder,
  setOpenedOrder,
  setIsNewStatus
} from '../../slices/ordersSlice';
import { openModal, closeModal, setShowErrorInModal } from '../../slices/modalSlice';

// Components
import ModalWindow from '../ModalWindow/ModalWindow';
import OrdersCounter from '../OrdersCounter/OrdersCounter';

// Gravitu IU components
import { Button, Link, Table, TableDataItem, withTableActions } from '@gravity-ui/uikit';
import { CirclePlus } from '@gravity-ui/icons';

// Utils
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';

export default function Orders(): JSX.Element {
  const dispatch = useDispatch();
  const isUserAdmin = useSelector((state: RootState) => state.users.isUserAdmin);
  const orders = useSelector((state: RootState) => state.orders.ordersArray);
  const openedOrder = useSelector((state: RootState) => state.orders.openedOrder);

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
              dispatch(deleteOrder(item.id));
            },
            theme: 'danger' as const
          }
        ]
      : [];
  };

  const openOrderInModal = (item: TableDataItem): void => {
    dispatch(setIsNewStatus(false));
    const currentOrder = orders.find(order => order.number === item.id);
    dispatch(setOpenedOrder(currentOrder));
    dispatch(openModal());
  };

  const openEmptyOrderInModal = (): void => {
    dispatch(setIsNewStatus(true));
    dispatch(openModal());
  };

  const handleEditOrder = (): void => {
    dispatch(editOrder(openedOrder));
    dispatch(closeModal());
  };

  const handleAddNewOrder = (): void => {
    dispatch(addOrder(openedOrder));
    dispatch(closeModal());
    dispatch(setShowErrorInModal(false));
  };

  const setNewOrderStatus = (event: any): void => {
    dispatch(setOpenedOrder({ ...openedOrder, status: event[0] }));
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
        setNewOrderStatus={setNewOrderStatus}
        saveOrder={handleEditOrder}
        addNewOrder={handleAddNewOrder}
      />
    </div>
  );
}
