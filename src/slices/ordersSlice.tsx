import { createSlice } from '@reduxjs/toolkit';

import { templateOrders } from '../variables/templateOrders';

import type { OrderElementType } from '../types/OrderElementType';

import { getDate } from '../utils/getDate';

interface orderState {
  ordersArray: OrderElementType[];
  openedOrder: OrderElementType;
  newOrderNumber: number;
  isNewOrder: boolean;
}

const emptyOrder: OrderElementType = {
  number: undefined,
  datetime: undefined,
  clientsFirm: undefined,
  shipperName: undefined,
  shipperPhone: '+7',
  comment: undefined,
  status: 'новая',
  atiCode: undefined
};

const initialState: orderState = {
  ordersArray: templateOrders,
  openedOrder: emptyOrder,
  newOrderNumber: 129,
  isNewOrder: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOpenedOrder: (state, action) => {
      state.openedOrder = action.payload;
    },

    setIsNewStatus: (state, action) => {
      state.isNewOrder = action.payload;
      state.openedOrder = { ...emptyOrder };
    },

    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        number: state.newOrderNumber,
        datetime: getDate(String(new Date()))
      };
      state.ordersArray.push(newOrder);
      state.newOrderNumber += 1;
      state.openedOrder = { ...emptyOrder };
    },

    editOrder: (state, action) => {
      let updatedOrder = action.payload;

      state.ordersArray.forEach((order, index) => {
        if (order.number !== updatedOrder.number) {
          return;
        }
        if (order.number === updatedOrder.number) {
          state.ordersArray[index] = updatedOrder;
        }
      });

      state.openedOrder = emptyOrder;
    },

    deleteOrder: (state, action) => {
      const orderNumberToDelete = action.payload;
      const orderIndexToDelete = state.ordersArray.findIndex(
        order => order.number === orderNumberToDelete
      );
      state.ordersArray.splice(orderIndexToDelete, 1);
    }
  }
});

export const { addOrder, editOrder, deleteOrder, setOpenedOrder, setIsNewStatus } =
  ordersSlice.actions;
export default ordersSlice.reducer;
