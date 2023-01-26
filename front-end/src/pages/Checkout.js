import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Header from '../components/Header';
import { requestGet, setToken } from '../services/requests';
import CheckoutTable from '../components/CheckoutTable';

export default function Checkout() {
  const { drinkCart, getToLocal } = useContext(Context);
  const [sellers, setSellers] = useState([
    { name: 'Fulano Seller', id: 1 },
    { name: 'Siclina Seller', id: 2 },
  ]);
  const [dataUser, setDataUser] = useState();

  // const handleChange = ({ target: { value } }) => {
  //   setQuantity(value);
  // };

  const getSellers = async () => {
    const list = await requestGet('/sellers');
    setSellers(list);
  };

  useEffect(() => {
    const { id, token } = getToLocal('user');
    setDataUser({ id, token });
    setToken(token);
  }, []);
  return (
    <main>
      <Header />
      <h1>Finalizar Pedido</h1>
      <CheckoutTable />

      <h1>Detalhes e Endereço para Entrega</h1>
      <section>

        <label htmlFor="seller-input">
          P. Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            name="seller-input"
          >
            { sellers.map((seller) => <option key={ seller.id }>{seller.name}</option>)}

          </select>
        </label>
        <label htmlFor="address-input">
          Endereço
          <input
            type="text"
            name="seller-input"
            placeholder="Digite seu endereço"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number-input">
          Número
          <input
            type="number"
            name="number-input"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar pedido
        </button>
      </section>
      <div>
        {}
      </div>
    </main>
  );
}
