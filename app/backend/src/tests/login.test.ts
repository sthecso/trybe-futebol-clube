import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /login', () => {

  describe('Verify loginControler', () => {
    describe('email point', () => {
      it('When email is empty', async () => {
        const user = {
          email: '',
          password: '123456'
        };
  
        await chai.request(app)
          .post('/login')
          .send(user)
          .then((res: Response) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('All fields must be filled');
          });
        })

        it('When dont have email', async () => {
          const user = {
            password: '123456'
            };

          await chai.request(app)
            .post('/login')
            .send(user)
            .then((res: Response) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('All fields must be filled');
            });
          })

        it('When incorrect email', async () => {
          const user = {
            email: 'teste',
            password: '123456'
            };

          await chai.request(app)
            .post('/login')
            .send(user)
            .then((res: Response) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('Incorrect email or password');
            });
          })
    })

    describe('password point', () => {
      it('When password is empty', async () => {
        const user = {
          email: 'RonaldinGaucho@fifa.com',
          password: ''
        };

        await chai.request(app)
          .post('/login')
          .send(user)
          .then((res: Response) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('All fields must be filled');
          });
        })

        it('When dont have password', async () => {
          const user = {
            email: 'RonaldinGaucho@fifa.com',
          };

          await chai.request(app)
            .post('/login')
            .send(user)
            .then((res: Response) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('All fields must be filled');
            });
          })
      })
    })
})
