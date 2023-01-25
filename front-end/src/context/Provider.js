import PropTypes from 'prop-types';
import React from 'react';
import Context from './Context';

function Provider({ children }) {
  const saveToLocal = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));

  // https://blog.agney.dev/useMemo-inside-context/

  const value = React.useMemo(() => ({
    saveToLocal,
  }), []);

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
