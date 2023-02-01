import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import Header from '../components/Header';
import { requestGet, setToken, requestPost } from '../services/requests';
import CheckoutTable from '../components/CheckoutTable';
import '../css/checkout.css';

export default function Checkout() {
  const navigate = useNavigate();

  const { getToLocal } = useContext(Context);
  const [data, setData] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
    totalPrice: '',
    products: [],
  });
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    try {
      const list = await requestGet('/seller');
      setSellers(list);
      setData({ ...data, sellerId: list[0]?.id });
      return list;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'deliveryNumber') {
      setData({ ...data, [name]: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  useEffect(() => {
    getSellers();
    const { token } = getToLocal('user');
    setToken(token);
  }, []);

  const sendDataToDB = async () => {
    try {
      const totalPrice = getToLocal('totalPrice');
      const products = getToLocal('cartDrinks')
        .map(({ id, quantity }) => ({ productId: id, quantity: Number(quantity) }));
      const { id } = await requestPost('/customer/orders', {
        ...data,
        totalPrice: Number(totalPrice.replace(',', '.')),
        products });
      // saveToLocal('cartDrinks', []);
      navigate(`/customer/orders/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container-checkout">
      <Header />
      <section className="container-section-checkout">
        <h1>Finalizar Pedido</h1>
        <CheckoutTable />
      </section>
      <section className="container-section-checkout">
        <h1>Detalhes e Endereço para Entrega</h1>
        <div className="line-checkout delivery-container">

          <label htmlFor="sellerName">
            P. Vendedora Responsável:
            <select
              data-testid="customer_checkout__select-seller"
              onChange={ handleChange }
              name="sellerId"
            >
              { sellers.map((seller) => (
                <option
                  key={ seller.id }
                  id={ seller.id }
                  value={ seller.id }
                >
                  { seller.name }
                </option>))}

            </select>
          </label>
          <label htmlFor="deliveryAddress">
            Endereço
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Digite seu endereço"
              data-testid="customer_checkout__input-address"
              value={ data.deliveryAddress }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="deliveryNumber">
            Número
            <input
              type="number"
              name="deliveryNumber"
              data-testid="customer_checkout__input-address-number"
              value={ data.deliveryNumber }
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => sendDataToDB() }
          >
            Finalizar pedido
          </button>
        </div>
      </section>
    </main>
  );
}
