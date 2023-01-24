module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING(200),
  },
  {
    tableName: 'products',
    underScored: true,
    timeStamps: false,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'sale_product' });
  }
  return Product;
};