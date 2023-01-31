import PropTypes from 'prop-types';
import React, { useState } from 'react';
import moment from 'moment';
import Context from './Context';

function Provider({ children }) {
  const saveToLocal = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
  const getToLocal = (name) => {
    const local = JSON.parse(localStorage.getItem(name));
    if (!local) {
      console.log(local);
      // saveToLocal('user', {});
      // saveToLocal('cartDrinks', []);
    } else {
      return local;
    }
  };
  const [drinkCart, setDrinkCart] = useState([]);
  // https://blog.agney.dev/useMemo-inside-context/
  const formatDate = (dateDB) => moment(dateDB).format('DD/MM/YYYY');
  const value = React.useMemo(() => ({
    saveToLocal, getToLocal, drinkCart, setDrinkCart, formatDate,
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
