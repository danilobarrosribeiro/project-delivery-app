import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Context from '../context/Context';

export default function DrinkCard({ drink }) {
  const [quantity, setQuantity] = useState(0);
  const { saveToLocal, setDrinkCart, getToLocal } = useContext(Context);

  const { name, price, id, url_image: image } = drink;

  const handleChange = ({ target: { value } }) => {
    if (value < 0) return setQuantity(0);
    setQuantity(value);
  };

  const addDrink = () => {
    const cartLocal = getToLocal('cartDrinks');
    const drinks = cartLocal.filter((e) => e.id !== id && e.id !== undefined);
    const product = {
      id,
      name,
      price,
      quantity,
    };
    if (!cartLocal && quantity > 0) {
      saveToLocal('cartDrinks', [product]);
    } if (quantity <= 0) {
      saveToLocal('cartDrinks', drinks);
    } else {
      drinks.push(product);
      saveToLocal('cartDrinks', drinks);
    }
    const updatedCart = getToLocal('cartDrinks');
    setDrinkCart(updatedCart);
  };

  const validateNegativeQuantity = () => {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
    }
  };

  useEffect(() => {
    addDrink();
  }, [quantity]);

  return (
    <div className="container-card-products ">
      <h2 data-testid={ `customer_products__element-card-price-${id}` }>
        {`R$${price.replace('.', ',')}`}
      </h2>
      <img
        className={ name === 'Skol Lata 250ml' ? 'img-skol' : 'img-card-products' }
        src={ image }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>{name}</h3>
      <div>
        <button
          className="btn-card"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => validateNegativeQuantity() }
        >
          -
        </button>
        <input
          className="input-quantity"
          value={ quantity }
          onChange={ handleChange }
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
          className="btn-card"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => setQuantity(Number(quantity) + 1) }
        >
          +
        </button>
      </div>
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

/* if (cartLocal[0] === undefined && quantity > 0) {
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
    setDrinkCart(updatedCart); */
