import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../context/Context';

export default function OrderCard({ order }) {
  const { formatDate } = useContext(Context);
  const [testId, setTestId] = useState('checkout');
  const { id, status, saleDate, totalPrice } = order;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/customer/orders') setTestId('seller');
  }, []);

  return (
    <button type="button" onClick={ () => navigate(`${id}`) }>
      <div
        data-testid={ `${testId}_orders__element-order-id-${id}` }
      >
        {`Pedido ${id}` }
      </div>
      <div
        data-testid={ `${testId}_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>
      <div data-testid={ `${testId}_orders__element-order-date-${id}` }>
        { formatDate(saleDate)}
      </div>
      <div
        data-testid={ `${testId}_orders__element-card-price-${id}` }
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
