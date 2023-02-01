import PropTypes from 'prop-types';
import React from 'react';

export default function RegistrationTable({ users }) {
  // const teste = [
  //   { id: 1,
  //     name: 'Fulana Pereira',
  //     email: 'fulana@deliveryapp.com',
  //     type: 'P. Vendedora' },
  //   { id: 2, name: 'Zé Birita', email: 'zebirita@email.com', type: 'Cliente' },
  // ];

  return (
    <table className="table-checkout">
      <thead className="line-checkout">
        <tr>
          <th className="line-checkout">Item</th>
          <th className="line-checkout">Nome</th>
          <th className="line-checkout">Email</th>
          <th className="line-checkout">Tipo</th>
          <th className="line-checkout">Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(({ id, name, email, role }, index) => (

            <tr key={ id }>
              <td
                className="line-checkout"
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                { index + 1 }

              </td>
              <td
                className="line-checkout"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { name }

              </td>
              <td
                className="line-checkout"
              >

                <p
                  data-testid={
                    `admin_manage__element-user-table-email-${index}`
                  }
                >
                  {email}
                </p>

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {role}

              </td>
              <td className="line-checkout">
                <button
                  type="button"
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

RegistrationTable.propTypes = {
  users: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
