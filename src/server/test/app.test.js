import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

const req = supertest(app);

describe('test for api base url', () => {
  it('should return ok with status code 200 when base api is called', done => {
    req.get('/api').end((error, res) => {
      expect(res.body.status).to.equal('Success');
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to Capstone');

      if (error) done(error);
      done();
    });
  });

  it('should return 404 when an invalid route is passed', done => {
    req.get('/api/invalidroute').end((error, res) => {
      expect(res.body.status).to.equal('Failed');
      expect(res.body.message).to.equal('Api has no match, redirect to /api');

      if (error) done(error);
      done();
    });
  });
});
