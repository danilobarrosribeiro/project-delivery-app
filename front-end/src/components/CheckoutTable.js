import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

export default function CheckoutTable() {
  const [drinks, setDrinks] = useState([]);
  const [testId, setTestId] = useState('checkout');
  const [role, setRole] = useState('customer');
  const pathCheckout = '/customer/checkout';
  const { saveToLocal, getToLocal } = useContext(Context);
  const location = useLocation();

  const setTotal = () => {
    const totalPrice = drinks.reduce((a, b) => a + Number(b.price * b.quantity), 0)
      .toFixed(2).toString().replace('.', ',');
    saveToLocal('totalPrice', totalPrice);
    return totalPrice;
  };

  const setSubTotal = (price, quantity) => {
    const numberTotal = Number(price * quantity);
    const subTotal = numberTotal.toFixed(2).toString().replace('.', ',');
    return `R$ ${subTotal}`;
  };

  useEffect(() => {
    const cartDrinks = getToLocal('cartDrinks');
    const user = getToLocal('user');
    setRole(user.role);
    setDrinks(cartDrinks);
    if (location.pathname !== pathCheckout) {
      setTestId('order_details');
    }
  }, []);

  const removeDrink = (id) => {
    const newDrinks = drinks.filter((d) => d.id !== id);
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
          { location.pathname === pathCheckout ? (
            <th className="line-checkout">Remover Item</th>
          ) : null }
        </tr>
      </thead>
      <tbody>
        { drinks.map((drink, index) => {
          const { id, name, price, quantity } = drink;
          const subTotal = setSubTotal(price, quantity);
          return (
            <tr key={ id }>
              <td
                className="line-checkout"
                data-testid={
                  `${role}_${testId}__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </td>
              <td
                className="line-checkout"
                data-testid={ `${role}_${testId}__element-order-table-name-${index}` }
              >
                { name }

              </td>
              <td
                className="line-checkout"
              >

                <p
                  data-testid={
                    `${role}_${testId}__element-order-table-quantity-${index}`
                  }
                >
                  {quantity}
                </p>

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `${role}_${testId}__element-order-table-unit-price-${index}`
                }
              >
                {price.toString().replace('.', ',')}

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `${role}_${testId}__element-order-table-sub-total-${index}`
                }
              >
                { subTotal }

              </td>
              {
                location.pathname === pathCheckout ? (
                  <td
                    className="line-checkout"
                    data-testid={
                      `${role}_checkout__element-order-table-remove-${index}`
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
      <tfoot>
        <tr>
          <td className="line-checkout total-value">
            {' '}
            Total: R$
            <div data-testid={ `${role}_${testId}__element-order-total-price` }>
              { setTotal() }
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
