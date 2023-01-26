import React, { useEffect, useState, useContext } from 'react';
import Headers from '../components/Headers';
import DrinkCard from '../components/DrinkCard';
import { requestGet } from '../services/requests';
import Context from '../context/Context';
import '../css/products.css';

function Products() {
  const [drinks, setDrinks] = useState([]);
  const { drinkCart, setDrinkCart, getToLocal } = useContext(Context);
  const [totalCart, setTotalCart] = useState(0);

  const getAll = async () => {
    const allDrinks = await requestGet('/customer/products');
    setDrinks(allDrinks);
  };

  const getTotalCart = () => {
    if (drinkCart.length > 0) {
      let total = 0;
      drinkCart.forEach((drink) => {
        total += Number(drink.quantity * drink.price);
        return total;
      });
      return setTotalCart((total).toFixed(2));
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
        data-testid="customer_products__button-cart"
      >
        {` Ver carrinho R$${totalCart}`}

      </button>
    </div>
  );
}

export default Products;
