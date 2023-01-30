import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ order: { id, i, status, date, total } }) {
  return (
    <div>
      <div
        data-testId={ `customer_orders__element-order-id-${id}` }
      >
        {`Pedido ${i}` }
      </div>
      <div
        data-testId={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>
        {date}
      </div>
      <div
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        {total}
      </div>
    </div>

  );
}

OrderCard.propTypes = {
  date: PropTypes.string,
  i: PropTypes.number,
  id: PropTypes.number,
  status: PropTypes.string,
  total: PropTypes.number,
}.isRequired;
