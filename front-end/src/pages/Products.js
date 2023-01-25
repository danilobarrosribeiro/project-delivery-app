import React, { useEffect, useState, useContext } from 'react';
import Headers from '../components/Headers';
import DrinkCard from '../components/DrinkCard';
import { requestGet } from '../services/requests';
import Context from '../context/Context';

function Products() {
  const [drinks, setDrinks] = useState([]);
  const { drinkCart, setDrinkCart } = useContext(Context);

  const getAll = async () => {
    const allDrinks = await requestGet('/customer/products');
    setDrinks(allDrinks);
  };

  useEffect(() => {
    const localCart = localStorage.getItem('cartDrinks');
    setDrinkCart(localCart);
    getAll();
  }, []);

  return (
    <div>
      <Headers />
      <main>
        {
          drinks.map((drink) => <DrinkCard key={ drink.id } drink={ drink } />)
        }
      </main>
      <button
        type="button"
        data-testid="customer_products__button-cart"
      >
        Ver carrinho

      </button>
    </div>
  );
}

export default Products;
