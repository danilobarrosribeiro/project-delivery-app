import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Headers from '../components/Header';
import Context from '../context/Context';
import CheckoutTable from '../components/CheckoutTable';
import { requestGet, setToken, requestPut } from '../services/requests';

export default function Orders() {
  const { getToLocal, formatDate } = useContext(Context);
  const [role, setRole] = useState('customer');
  const [sale, setSale] = useState({});
  const { id } = useParams();

  const getSaleById = async () => {
    const saleById = await requestGet(`/${role}/orders/${id}`);
    setSale(saleById);
  };

  const getNameSeller = (sellerId) => {
    const sellers = getToLocal('sellers');
    if (sellers) return sellers.find((seller) => Number(seller.id) === Number(sellerId));
  };

  const updateStatus = async ({ target: { name } }) => {
    try {
      let newStatus = 'Em Trânsito';
      if (name === 'preparing') {
        newStatus = 'Preparando';
      }
      console.log(newStatus);
      await requestPut(`${role}/orders/${id}`, { status: newStatus });
      setSale(await requestGet(`/${role}/orders/${id}`));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const localUser = getToLocal('user');
    setRole(localUser.role);
    setToken(localUser.token);
    getSaleById();
  }, []);

  return (
    <div>
      <div>
        <Headers />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p
            data-testid={
              `${role}_order_details__element-order-details-label-order-id`
            }
          >
            { `PEDIDO ${sale.id}` }
          </p>
          { role === 'customer' ? (
            <p
              data-testid={ `customer_order_details__
              element-order-details-label-seller-name` }
            >
              { `P.Vend: ${getNameSeller(sale.sellerId)?.name}` }
            </p>
          ) : null }
          <p
            data-testid={
              `${role}_order_details__element-order-details-label-order-date`
            }
          >
            { formatDate(sale.saleDate) }
          </p>
          <p
            data-testid={
              `${role}_order_details__element-order-details-label-delivery-status`
            }
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
              <button
                type="button"
                data-testid="seller_order_details__button-preparing-check"
                disabled={ sale.status !== 'Pendente' }
                name="preparing"
                onClick={ (event) => updateStatus(event) }
              >
                PREPARAR PEDIDO

              </button>
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
                name="dispatch"
                disabled={ sale.status !== 'Preparando' }
                onClick={ (event) => updateStatus(event) }
              >
                SAIU PRA ENTREGA

              </button>
            </div>
          )}
          <CheckoutTable />
        </div>
      </div>
    </div>
  );
}
