module.exports = (sequelize, DataTypes) => {

  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: { type: DataTypes.INTEGER,
      foreignKey: true,
      // field: 'sale_id',
      primaryKey: true,
    },
    productId: { type: DataTypes.INTEGER,
      foreignKey: true,
      // field: 'product_id',
      primaryKey: true,
    },
    quantity: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      // through: SaleProduct,
      // otherKey: 'sale_id',
      as: 'products',
    });
    SaleProduct.belongsTo(models.Sale, {
      // through: SaleProduct,
      onDelete: 'cascade',
      onUpdate: 'cascade',
      foreignKey: 'sale_id',
      // otherKey: 'product_id',
      as: 'sales',
    });
  };

  return SaleProduct;
};