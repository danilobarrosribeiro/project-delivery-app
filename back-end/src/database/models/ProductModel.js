'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Products', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    url_Image: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url_image'
    }
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'products',
  });
  return Product;
};