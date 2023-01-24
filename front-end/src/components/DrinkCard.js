import PropTypes from 'prop-types';
import React, { /* useEffect, useContext, */ useState } from 'react';
/* import Context from '../context/Context'; */

export default function DrinkCard({ drink }) {
  console.log(drink);
  const [quantity, setQuantity] = useState(0);
  /* const { setDrinkCart, drinkCart } = useContext(Context); */

  const { name, price /* id */ } = drink;

  /* const addDrink = () => {
    const drinkC = drinkCart.filter((e) => e.id === id);
    const drinks = drinkCart.filter((e) => e.id !== id);
    if (!drinkC) {
      setDrinkCart([...drinkCart, {
        url_image: drinkCart.url_image,
        name,
        price,
        id,
        quantity,
      }]);
    } else if (quantity < 0) {
      setDrinkCart([drinks]);
    } else {
      setDrinkCart([...drinks, {
        url_image: drinkCart.url_image,
        name,
        price,
        id,
        quantity,
      }]);
    }
  }; */

  const validateNegativeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  /* useEffect(() => {
    addDrink();
  }, [quantity]); */

  return (
    <div>
      <h2>{price}</h2>
      <img src={ drink.url_image } alt={ name } />
      <h3>{name}</h3>
      <button
        type="button"
        onClick={ () => validateNegativeQuantity() }
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        type="button"
        onClick={ setQuantity(quantity + 1) }
      >
        +
      </button>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
