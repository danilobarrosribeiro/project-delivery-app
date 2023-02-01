import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../components/Header';
import DrinkCard from '../components/DrinkCard';
import { requestGet, setToken } from '../services/requests';
import Context from '../context/Context';
import '../css/products.css';

function Products() {
  const [drinks, setDrinks] = useState([]);
  const {
    drinkCart,
    setDrinkCart,
    getToLocal,
  } = useContext(Context);

  const [totalCart, setTotalCart] = useState(0);
  const navigate = useNavigate();

  const getAll = async () => {
    try {
      const { token } = getToLocal('user');
      setToken(token);
      const allDrinks = await requestGet('/customer/products');
      setDrinks(allDrinks);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCart = () => {
    let total = 0;
    if (drinkCart.length > 0) {
      drinkCart.forEach((drink) => {
        total += Number(drink.quantity * drink.price);
        return total;
      });
      const newTotal = total.toFixed(2).toString().replace('.', ',');
      setTotalCart(newTotal);
    } else {
      setTotalCart('0,00');
    }
  };

  useEffect(() => {
    const localCart = getToLocal('cartDrinks');
    setDrinkCart(localCart);
    getAll();
  }, []);

  useEffect(() => {
    getTotalCart();
  }, [drinkCart]);

  return (
    <div>
      <Headers />
      <main className="container-products">
        {
          drinks.map((drink) => <DrinkCard key={ drink.id } drink={ drink } />)
        }
      </main>
      <button
        className="btn-cart"
        type="button"
        disabled={ totalCart === '0,00' }
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
      >
        Ver carrinho: R$
        <p data-testid="customer_products__checkout-bottom-value">
          {totalCart}
        </p>
      </button>
    </div>
  );
}

export default Products;
