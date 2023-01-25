import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import DrinkCard from '../components/DrinkCard';
// import { requestGet } from '../services/requests';

function Products() {
  const drinksMock = [
    { id: 1, name: 'Skol Lata 250ml', price: 2.20, url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg' },
    { id: 2, name: 'Heineken 600ml', price: 7.50, url_image: 'http://localhost:3001/images/heineken_600ml.jpg' },
  ];

  const [drinks, setDrinks] = useState([]);
  // const getAll = async () => {
  //   const allDrinks = await requestGet('/products'); return allDrinks;
  // };
  useEffect(() => {
    setDrinks(drinksMock);
  }, []);
  return (
    <div>
      <Headers />
      <main>
        {
          drinks.map((drink) => <DrinkCard key={ drink.id } drink={ drink } />)
        }
      </main>
    </div>
  );
}

export default Products;
