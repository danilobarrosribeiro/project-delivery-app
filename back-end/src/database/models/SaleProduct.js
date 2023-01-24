module.exports = (sequelize, DataTypes) => {

  const SaleProduct = sequelize.define('SaleProduct', {
    sellerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    timeStamps: false,
    underScored: true,
    tableName: 'sales_products',
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: 'products_id',
      through: SaleProduct,
      otherKey: 'sales',
      as: 'products',
    });
    models.Product.belongsToMany(models.Sale), {
      through: SaleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      as: 'sales',
    };
  };

  return SaleProduct;
};