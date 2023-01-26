const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    url_image: DataTypes.STRING(200),
  },
  {
    sequelize: db,
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'sale_product' });
  }
  return Product;
};