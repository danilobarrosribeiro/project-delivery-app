import React, { useEffect, useState, useContext } from 'react';
import Headers from '../components/Header';
import Context from '../context/Context';
import CheckoutTable from '../components/CheckoutTable';

export default function Orders() {
  const { saveToLocal } = useContext(Context);
  const [role, setRole] = useState('');
  const [sale, setSale] = useState({});
  // .toLocaleDateString('pt-br')

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    saveToLocal('cartDrinks', sale.products);
    setRole(localUser.role);
    setSale({
      id: 3,
      sellerName: 'Fulana',
      sellerId: 3,
      deliveryNumber: 3,
      totalPrice: '28,50',
      status: 'pendente',
      saleDate: '2023-01-30T18:42:21.165Z',
      products: [{
        id: 1,
        name: 'Não beba',
        quantity: 2,
        price: '3,50',
      }],
    });
  }, []);

  return (
    <div>
      <div>
        <Headers />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p data-testid="customer_order_details__element-order-details-label-order-id">
            { `PEDIDO ${sale.deliveryNumber}` }
          </p>
          <p>{ `P.Vend: ${sale.sellerName}` }</p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { sale.saleDate }
          </p>
          <p>{ sale.status }</p>
          { role === 'customer' ? (
            <button type="button">
              MARCAR COMO ENTREGUE
            </button>
          ) : (
            <div>
              <button type="button">PREPARAR PEDIDO</button>
              <button type="button">SAIU PRA ENTREGA</button>
            </div>
          )}
          <CheckoutTable />
        </div>
      </div>
    </div>
  );
}
