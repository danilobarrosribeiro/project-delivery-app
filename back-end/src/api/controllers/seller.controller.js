const sellerService = require('../services/seller.service');

  const getSalesBySellerId = async (req, res) => {
    const sellerId = req.body.payload.id;
    const { type, message } = await sellerService.getSalesBySellerId(sellerId);
  
    res.status(type).json(message);
  };

  const getAllSellers = async (_req, res) => {
    const { type, message } = await sellerService.getAllSellers();

    res.status(type).json(message);
  };

module.exports = {
    getSalesBySellerId,
    getAllSellers,
  };