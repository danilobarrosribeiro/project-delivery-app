import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const saveToLocal = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
  const [drinkCart, setDrinkCart] = useState([]);

  // https://blog.agney.dev/useMemo-inside-context/

  const value = React.useMemo(() => ({
    saveToLocal, drinkCart, setDrinkCart,
  }), [drinkCart]);

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
