const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(10,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50),
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'customer' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sale;
};