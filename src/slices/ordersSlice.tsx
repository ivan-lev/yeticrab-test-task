import { createSlice } from '@reduxjs/toolkit';

import { templateOrders } from '../variables/templateOrders';

import type { OrderElementType } from '../types/OrderElementType';

import { getDate } from '../utils/getDate';

interface storeState {
  ordersArray: OrderElementType[];
  newOrderNumber: number;
}

const initialState: storeState = {
  ordersArray: templateOrders,
  newOrderNumber: 129
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = action.payload;
      newOrder.number = state.newOrderNumber;
      const currentDateTime = String(new Date());
      newOrder.datetime = getDate(currentDateTime);
      state.ordersArray.push(newOrder);
      state.newOrderNumber += 1;
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
    },

    deleteOrder: (state, action) => {
      const orderNumberToDelete = action.payload.number;
      const orderIndexToDelete = state.ordersArray.findIndex(
        order => order.number === orderNumberToDelete
      );
      state.ordersArray.splice(orderIndexToDelete, 1);
    }
  }
});

export const { addOrder, editOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
