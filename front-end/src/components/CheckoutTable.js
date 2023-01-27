import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';

export default function CheckoutTable() {
  const [drinks, setDrinks] = useState([]);
  const { saveToLocal, getToLocal } = useContext(Context);
  const location = useLocation();

  const setSubTotal = (price, quantity) => {
    const numberTotal = Number(price * quantity);
    return `R$ ${numberTotal.toFixed(2).toString().replace('.', ',')}`;
  };
  useEffect(() => {
    setDrinks(getToLocal('cartDrinks'));
  }, []);

  const removeDrink = (id) => {
    const newDrinks = drinks.filter((d) => d.id !== id);
    saveToLocal('cartDrinks', newDrinks);
    setDrinks(newDrinks);
  };

  return (
    <table className="table-checkout">
      <thead className="line-checkout">
        <tr>
          <th className="line-checkout">Item</th>
          <th className="line-checkout">Descrição</th>
          <th className="line-checkout">Quantidade</th>
          <th className="line-checkout">Valor Unitário</th>
          <th className="line-checkout">Sub-total</th>
          <th className="line-checkout">Remover Item</th>
        </tr>
      </thead>
      <tbody>
        { drinks.map((drink, index) => {
          const { id, name, price, quantity } = drink;
          return (
            <tr key={ id }>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </td>
              <td
                className="line-checkout"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { name }

              </td>
              <td
                className="line-checkout"
              >
                <input
                  type="number"
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                  value={ quantity }
                />

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {price}

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { setSubTotal(price, quantity) }

              </td>
              {
                location.pathname === '/customer/checkout' ? (
                  <td
                    className="line-checkout"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <button type="button" onClick={ () => removeDrink(id) }>
                      Remover
                    </button>
                  </td>
                ) : null
              }
            </tr>
          );
        }) }
      </tbody>
      <tr>
        <td className="line-checkout total-value">
          {' '}
          Total: R$
          <td data-testid="customer_checkout__element-order-total-price">
            {getToLocal('totalPrice')}
          </td>
        </td>
      </tr>
    </table>
  );
}
