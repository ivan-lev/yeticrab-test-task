import './App.scss';

// Hooks
import { useState } from 'react';

// Components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

// Variables,
import { templateOrders } from '../../variables/templateOrders';

// Types, interfaces
import { OrderElementType } from '../../types/OrderElementType';

export default function App() {
  const [orders, setOrders] = useState<OrderElementType[]>(templateOrders);
  const [latestOrderNumber, setLatestOrderNumber] = useState<number>(129);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  return (
    <>
      <Header isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode}></Header>
      <Main
        orders={orders}
        setOrders={setOrders}
        isAdminMode={isAdminMode}
        latestOrderNumber={latestOrderNumber}
        setLatestOrderNumber={setLatestOrderNumber}
      />
      <Footer />
    </>
  );
}
