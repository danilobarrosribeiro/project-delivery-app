import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Context from '../context/Context';

export default function DrinkCard({ drink }) {
  const [quantity, setQuantity] = useState(0);
  const { saveToLocal, setDrinkCart } = useContext(Context);

  const { name, price, id, url_image: image } = drink;

  const handleChange = ({ target: { value } }) => {
    setQuantity(value);
  };

  const addDrink = () => {
    const cartLocal = JSON.parse(localStorage.getItem('cartDrinks'));
    const drinks = cartLocal.filter((e) => e.id !== id && e.id !== undefined);
    if (cartLocal[0] === undefined && quantity > 0) {
      saveToLocal('cartDrinks', [{
        url_image: image,
        name,
        price,
        id,
        quantity,
      }]);
    } else if (quantity > 0) {
      saveToLocal('cartDrinks', [...drinks, {
        url_image: image,
        name,
        price,
        id,
        quantity,
      }]);
    } else if (quantity <= 0 && cartLocal[0] !== undefined) {
      saveToLocal('cartDrinks', [drinks]);
    }
    const updatedCart = JSON.parse(localStorage.getItem('cartDrinks'));
    setDrinkCart(updatedCart);
  };

  const validateNegativeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    addDrink();
  }, [quantity]);

  return (
    <div>
      <h2 data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </h2>
      <img
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>{name}</h3>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => validateNegativeQuantity() }
      >
        -
      </button>
      <input
        value={ quantity }
        onChange={ handleChange }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQuantity(quantity + 1) }
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
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};
