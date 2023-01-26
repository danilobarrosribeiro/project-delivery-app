import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

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
    <section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { drinks.map((drink, index) => {
            const { id, name, price, quantity } = drink;
            return (
              <tr key={ id }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { name }

                </td>
                <td>
                  <input
                    type="number"
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                    value={ quantity }
                  />

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {price}

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { setSubTotal(price, quantity) }

                </td>
                {
                  location.pathname === '/customer/checkout' ? (
                    <td
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
      </table>
      <button
        type="button"
      >
        Total: R$
        <p data-testid="customer_checkout__element-order-total-price">
          {getToLocal('totalPrice')}
        </p>
      </button>
    </section>
  );
}
