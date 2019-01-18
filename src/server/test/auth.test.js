import supertest from 'supertest';
import { expect } from 'chai';
import { STATUS_CODES } from 'http';
import app from '../app';
import UserModel from '../models/UserModel';
import userData from './__mock__/userData';

const req = supertest(app);

describe('test sign up', () => {
  before(async () => {
    await UserModel.deleteMany({});
  });

  describe('sign up with valid data', () => {
    it('should create a new user successfully with valid data', done => {
      req
        .post('/api/signup')
        .send(userData.validData)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal(STATUS_CODES[201]);
          expect(res.body.message).to.equal('Signup is successful');

          if (error) done(error);
          done();
        });
    });
  });

  describe('sign up with valid data', () => {
    it('should not create a new user successfully with same email/username', done => {
      req
        .post('/api/signup')
        .send(userData.validData)
        .end((error, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal(STATUS_CODES[409]);
          expect(res.body.message).deep.equal({
            username: 'Username is already taken',
            email: 'Email already exist'
          });

          if (error) done(error);
          done();
        });
    });
  });

  describe('sign up with invalid data', () => {
    it('should not create a new user with invalid data', done => {
      req
        .post('/api/signup')
        .send(userData.invalidData)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(STATUS_CODES[400]);

          if (error) done(error);
          done();
        });
    });
  });

  describe('sign in with valid data', () => {
    it('should login a user successfully with valid data', done => {
      req
        .post('/api/login')
        .send(userData.userLogin)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(STATUS_CODES[200]);
          expect(res.body.message).to.equal('Signin is successful');

          if (error) done(error);
          done();
        });
    });
  });

  describe('sign in with invalid email address', () => {
    it('should not login a user successfully with invalid email address', done => {
      req
        .post('/api/login')
        .send(userData.invalidEmail)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(STATUS_CODES[400]);
          expect(res.body.message).to.equal('Invalid email or password');

          if (error) done(error);
          done();
        });
    });
  });

  describe('sign in with invalid password', () => {
    it('should not login a user successfully with invalid password', done => {
      req
        .post('/api/login')
        .send(userData.invalidPassword)
        .end((error, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal(STATUS_CODES[400]);
          expect(res.body.message).to.equal('Invalid email or password');

          if (error) done(error);
          done();
        });
    });
  });
});
