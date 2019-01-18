import supertest from 'supertest';
import { expect } from 'chai';
import { STATUS_CODES } from 'http';
import app from '../app';
import userData from './__mock__/userData';

const req = supertest(app);

describe('test git-cheat-sheet', () => {
  let token;
  before(done => {
    req
      .post('/api/login')
      .send(userData.userLogin)
      .end((error, res) => {
        token = res.body.payload;

        if (error) done(error);
        done();
      });
  });

  it('should not access cheat page with undefined token', done => {
    req.get('/api/cheats').end((error, res) => {
      expect(res.status).to.equal(403);
      expect(res.body.status).to.equal(STATUS_CODES[403]);
      expect(res.body.message).to.equal('Access denied. You are not logged in');

      if (error) done(error);
      done();
    });
  });

  it('should not access cheat page with wrong token', done => {
    req
      .get('/api/cheats')
      .set('x-access-token', 'invalid-token')
      .end((error, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(STATUS_CODES[401]);
        expect(res.body.message).to.equal('Authentication failed. Token is invalid or expired');

        if (error) done(error);
        done();
      });
  });

  it('should access cheat page with valid token', done => {
    req
      .get('/api/cheats')
      .set('x-access-token', token)
      .end((error, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(STATUS_CODES[200]);
        expect(res.body.message).to.equal('Retrieved all categories with cheats');

        if (error) done(error);
        done();
      });
  });
});
