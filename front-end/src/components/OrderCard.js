import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function OrderCard({ order }) {
  const { formatDate } = useContext(Context);
  const { id, status, saleDate, totalPrice } = order;
  const navigate = useNavigate();
  return (
    <button type="button" onClick={ () => navigate(`${id}`) }>
      <div
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {`Pedido ${id}` }
      </div>
      <div
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>
        { formatDate(saleDate)}
      </div>
      <div
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        {totalPrice.toString().replace('.', ',')}
      </div>
    </button>

  );
}

OrderCard.propTypes = {
  saleDate: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.number,
}.isRequired;
