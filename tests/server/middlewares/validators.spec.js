import mocha from 'mocha';
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';

const { expect } = chai;
const request = supertest(app);

describe('Test', () => {
  it('should expect true to equal true', () => {
    expect(true).to.equal(true);
    expect(2).to.equal(2);
  });
});
