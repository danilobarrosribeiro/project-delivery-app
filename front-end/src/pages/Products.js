import React, { useEffect /* useState */ } from 'react';
import Headers from '../components/Headers';
import DrinkCard from '../components/DrinkCard';
// import { requestGetAll } from '../services/requests';

function Products() {
  const drinksMock = [
    { id: 1, name: 'Skol Lata 250ml', price: 2.20, url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg' },
    { id: 2, name: 'Heineken 600ml', price: 7.50, url_image: 'http://localhost:3001/images/heineken_600ml.jpg' },
  ];

  // const [drinks, setDrinks] = useState([]);
  // const allDrinks = await requestGetAll('/products');
  const getAll = async () => drinksMock;
  useEffect(() => {
    setDrinks(getAll());
  }, []);
  return (
    <div>
      <Headers />
      <main>
        {
          drinksMock.map((drink) => <DrinkCard key={ drink.id } drink={ drink } />)
        }
      </main>
    </div>
  );
}

export default Products;
