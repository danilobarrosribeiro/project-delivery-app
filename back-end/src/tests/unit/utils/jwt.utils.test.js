const sinon = require('sinon');
const jwtUtils = require('../../../api/utils/jwt.utils');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');

describe('jwtUtils layer tests', () => {
  it('should create a token', () => {
    const token = 'dn28f02ry20rf82hnbf0423f';
    const payload = {
      id: 1,
      name: 'nome'
    }
    sinon.stub(jwt, 'sign').returns(token);
    const response = jwtUtils.createToken(payload);
    expect(response).to.be.equal(token);
  });

  it('should validate a correct token', () => {
    const token = 'dn28f02ry20rf82hnbf0423f';
    const key = 'secret';
    const payload = {
      id: 1,
      name: 'nome'
    }
    sinon.stub(jwt, 'verify').returns(payload);
    const data = jwtUtils.validateToken(token, key);
    expect(data).to.be.deep.equal({ validated: true, data: payload })
  });

  it('should not validate an incorrect token', () => {
    const token = 'dn28f02ry20rf82hnbf0423f';
    const key = 'secret';
    const payload = {
      id: 1,
      name: 'nome'
    }
    sinon.stub(jwt, 'verify').throws(new Error());
    const data = jwtUtils.validateToken(token, key);
    expect(data).to.be.deep.equal({ validated: false })
  });

  afterEach(() => {
    sinon.restore();
  });
});