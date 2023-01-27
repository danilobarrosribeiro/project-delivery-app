const saleService = require('../services/sale.service');

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getById(id);
  res.status(type).json(message);
};

const createSale = async (req, res) => {
  const userId = req.body.payload.id;
  const { payload: _, ...order } = req.body;
  
  const { type, message } = await saleService.createSale(order, userId);
   res.status(type).json(message);
  };

const getSalesByUserId = async (req, res) => {
  const userId = req.body.payload.id;
  const { type, message } = await saleService.getSalesByUserId(userId);

  res.status(type).json(message);
};

const updateSale = async (req, res) => {
  const orderStatus = req.body.status;
  const { id } = req.params;
  const { payload } = req.body; 
  const { type, message } = await saleService.updateSale(orderStatus, id, payload);

  res.status(type).json(message);
};

module.exports = {
  getById,
  createSale,
  getSalesByUserId,
  updateSale,
};
