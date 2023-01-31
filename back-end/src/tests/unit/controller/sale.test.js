const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { getById, createSale, getSalesByUserId, updateSale } = require('../../../api/controllers/sale.controller');
const saleService = require('../../../api/services/sale.service');

const { expect } = chai;
chai.use(sinonChai);

describe('sale controller layer tests', () => {
  it('getById function', async () => {
    const req = { params: { id: 1 } };
    const res = {};
    const type = 200;
    const message = { message: 'message' };

    sinon.stub(saleService, 'getById').resolves({ type, message });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getById(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });

  // it('createSale function', async () => {
  //   const req = { body: 'sale' };
  //   const res = {};
  //   const type = 200;
  //   const message = { message: 'message' };

  //   sinon.stub(saleService, 'createSale').resolves({ type, message});
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   await createSale(req, res);
  //   expect(res.status).to.have.been.calledWith(type);
  //   expect(res.json).to.have.been.calledWith(message);
  // });
  it('getSalesByUserId function', async () => {
    const req = { body: { payload: { id: 1} } };
    const res = {};
    const type = 200;
    const message = { message: 'message' };

    sinon.stub(saleService, 'getSalesByUserId').resolves({ type, message});
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getSalesByUserId(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);
  });
  it('updateSale function', async () => {
    const req = { body: { status: 1, payload: 'payload' }, params: { id: '1' } };
    const res = {};
    const type = 200;
    const message = { message: 'message' };

    sinon.stub(saleService, 'updateSale').resolves({ type, message});
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await updateSale(req, res);
    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith(message);    
  });
  afterEach(() => {
    sinon.restore();
  });
})