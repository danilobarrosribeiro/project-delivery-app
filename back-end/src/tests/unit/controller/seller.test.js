const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { getSalesBySellerId } = require('../../../api/controllers/seller.controller');
const sellerService = require('../../../api/services/seller.service');

const { expect } = chai;
chai.use(sinonChai);

describe('seller controller layer tests', () => {
  it('getSalesBySellerId function', async () => {
    const req = { body: { payload: { id: 1 } } };
    const res = {};
    const type = 200;
    const message = { message: 'message' };

    sinon.stub(sellerService, 'getSalesBySellerId').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getSalesBySellerId(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });
})