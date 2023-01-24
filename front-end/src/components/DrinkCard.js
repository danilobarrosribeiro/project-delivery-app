import PropTypes from 'prop-types';
import React, { /* useEffect, useContext */ useState } from 'react';
// import Context from '../context/Context';

export default function DrinkCard({ drink }) {
  const [quantity, setQuantity] = useState(0);
  // const { setDrinkCart, drinkCart } = useContext(Context);

  const { name, price, id } = drink;

  // const addDrink = () => {
  //   const drinkC = drinkCart.filter((e) => e.id === id);
  //   const drinks = drinkCart.filter((e) => e.id !== id);
  //   if (!drinkC) {
  //     setDrinkCart([...drinkCart, {
  //       url_image: drinkCart.url_image,
  //       name,
  //       price,
  //       id,
  //       quantity,
  //     }]);
  //   } else if (quantity < 0) {
  //     setDrinkCart([drinks]);
  //   } else {
  //     setDrinkCart([...drinks, {
  //       url_image: drinkCart.url_image,
  //       name,
  //       price,
  //       id,
  //       quantity,
  //     }]);
  //   }
  // };

  const validateNegativeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // useEffect(() => {
  //   addDrink();
  // }, [quantity]);

  return (
    <div data-testid={ `customer_products__element-card-price-${id}` }>
      <h2>{price}</h2>
      <img
        src={ drink.url_image }
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
      <p data-testid={ `customer_products__input-card-quantity-${id}` }>{quantity}</p>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => setQuantity(quantity + 1) }
      >
        +
      </button>
      <button
        type="button"
        data-testid="customer_products__button-cart "
      >
        Ver carrinho

      </button>
    </div>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    url_image: PropTypes.string,
  }).isRequired,
};
