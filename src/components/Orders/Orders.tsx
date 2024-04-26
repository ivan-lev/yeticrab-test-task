import './Orders.scss';

// Hooks
import { useState, SetStateAction, Dispatch } from 'react';

// Components
import ModalWindow from '../ModalWindow/ModalWindow';
import OrdersCounter from '../OrdersCounter/OrdersCounter';

// Gravitu IU components
import { Button, Link, Table, TableDataItem, withTableActions } from '@gravity-ui/uikit';
import { CirclePlus } from '@gravity-ui/icons';

// Utils
import { getDate } from '../../utils/getDate';
import { getAtiLink } from '../../utils/getAtiLink';
import { deleteOrder } from '../../utils/orders/deleteOrder';
import { editOrder } from '../../utils/orders/editOrder';
import { addNewOrder } from '../../utils/orders/addNewOrder';

// Variables
import { BUTTON_NAMES } from '../../variables/buttonNames';

// Types, interfaces
import { tableColumnsEnum } from '../../types/tableColumnsType';
import { OrderElementType } from '../../types/OrderElementType';
import { OrderStatusEnum } from '../../types/OrderStatus';

export default function Orders({
  orders,
  setOrders,
  isAdminMode,
  latestOrderNumber,
  setLatestOrderNumber
}: {
  orders: OrderElementType[];
  setOrders: Dispatch<SetStateAction<OrderElementType[]>>;
  isAdminMode: boolean;
  latestOrderNumber: number;
  setLatestOrderNumber: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  const emptyOrderElement: OrderElementType = {
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
  const [openedOrder, setOpenedOrder] = useState<OrderElementType>(emptyOrderElement);
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
    return isAdminMode
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
              deleteOrder(item, orders, setOrders);
            },
            theme: 'danger' as const
          }
        ]
      : [];
  };

  const openOrderInModal = (item: TableDataItem) => {
    const currentOrder = orders.find(record => record.number === item.id);
    setOpenedOrder(currentOrder ?? emptyOrderElement);
    setIsModalOpened(true);
  };

  const openEmptyOrderInModal = () => {
    setIsNewOrder(true);
    const currentOrder = emptyOrderElement;
    currentOrder.status = OrderStatusEnum.new;
    setOpenedOrder(currentOrder);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
    setOpenedOrder(emptyOrderElement);
    isNewOrder && setIsNewOrder(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setOpenedOrder({ ...openedOrder, [name]: value });
  };

  const handleEditOrder = () => {
    editOrder(openedOrder, orders, setOrders);
    closeModal();
  };

  const handleAddNewOrder = () => {
    addNewOrder(openedOrder, orders, setOrders, latestOrderNumber, setLatestOrderNumber);
    closeModal();
  };

  const setNewOrderStatus = (event: any): void => {
    setOpenedOrder({ ...openedOrder, status: event[0] });
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
        {isAdminMode && (
          <Button onClick={openEmptyOrderInModal}>
            <span className="button-content">
              <CirclePlus />
              {BUTTON_NAMES.ADD_ORDER}
            </span>
          </Button>
        )}
      </div>

      <ModalWindow
        isModalOpened={isModalOpened}
        closeModal={closeModal}
        openedOrder={openedOrder}
        handleChange={handleChange}
        setNewOrderStatus={setNewOrderStatus}
        isNewOrder={isNewOrder}
        saveOrder={handleEditOrder}
        addNewOrder={handleAddNewOrder}
      />
    </div>
  );
}
