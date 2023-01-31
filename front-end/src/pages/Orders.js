import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../components/Header';
import OrderCard from '../components/OrderCard';
import Context from '../context/Context';
import { setToken, requestGet } from '../services/requests';

export default function Orders() {
  const { getToLocal } = useContext(Context);
  const [allOrders, setAllOrders] = useState([]);
  const { pathname } = useLocation();

  const getOrders = async () => {
    let orders = [];
    if (pathname === '/customer/orders') {
      orders = await requestGet('/customer/orders');
      setAllOrders(orders);
    } else {
      orders = await requestGet('/seller/orders');
      setAllOrders(orders);
    }
  };

  useEffect(() => {
    const { token } = getToLocal('user');
    setToken(token);
    getOrders();
  }, []);

  return (
    <div>
      <Headers />
      <div>
        {allOrders.map((e) => <OrderCard order={ e } key={ e.id } />)}
      </div>
    </div>
  );
}
