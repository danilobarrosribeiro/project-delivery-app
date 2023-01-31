import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Headers from '../components/Header';
import Context from '../context/Context';
import CheckoutTable from '../components/CheckoutTable';
import { requestGet, setToken } from '../services/requests';

export default function Orders() {
  const { getToLocal, formatDate } = useContext(Context);
  const testId = 'customer_order_details__element-order-details-label-delivery-status';
  const [role, setRole] = useState('customer');
  const [sale, setSale] = useState({});
  const { id } = useParams();

  const getSaleById = async (localUser) => {
    setRole(localUser.role);
    setToken(localUser.token);
    const saleById = await requestGet(`/customer/orders/${id}`);
    setSale(saleById);
    console.log(saleById);
    // saveToLocal('cartDrinks', saleById.products);
  };

  const getNameSeller = (sellerId) => {
    const sellers = getToLocal('sellers');
    return sellers.find((seller) => Number(seller.id) === Number(sellerId));
  };

  useEffect(() => {
    const localUser = getToLocal('user');
    getSaleById(localUser);
  }, []);

  return (
    <div>
      <div>
        <Headers />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p data-testid="customer_order_details__element-order-details-label-order-id">
            { `PEDIDO ${sale.id}` }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { `P.Vend: ${getNameSeller(sale.sellerId)?.name}` }
          </p>
          <p
            data-testid={
              `${role}_order_details__element-order-details-label-order-date`
            }
          >
            { formatDate(sale.saleDate) }
          </p>
          <p
            data-testid={ testId }
          >
            { sale.status }
          </p>
          { role === 'customer' ? (
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              disabled={ sale.status !== 'Em Trânsito' }
            >
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
