module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    SaleDate: DataTypes.DATE,
    status: DataTypes.STRING(50),
  },
  {
    timeStamps: false,
    underScored: true,
    tableName: 'sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'customer' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sale;
};