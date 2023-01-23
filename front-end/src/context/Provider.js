import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({
    name: '',
    role: '',
  });

  // https://blog.agney.dev/useMemo-inside-context/

  const value = React.useMemo(() => ({
    user, setUser,
  }), [user]);

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
