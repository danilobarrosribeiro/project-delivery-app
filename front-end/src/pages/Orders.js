import React, { useEffect } from 'react';
import Headers from '../components/Header';
import { requestGet } from '../services/requests';

export default function Orders() {
  const getAllOrders = async (path) => {
    await requestGet(`/${path}/orders`);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    getAllOrders(localUser.role);
  }, []);

  return (
    <div>
      <Headers />
    </div>
  );
}
