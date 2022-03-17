import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /login', () => {

  describe('Verify loginControler', () => {

    describe('Login sucess', () => {
      it('should return a token', async () => {
        const user = {
          "email": "admin@admin.com",
          "password": "secret_admin"
        }

        await chai.request(app)
          .post('/login')
          .send(user)
          .then((res: Response) => {
            const { user, token } = res.body;

            expect(res).to.have.status(200);
            expect(token).to.be.a('string');
            expect(user).to.be.a('object');
            expect(token).not.to.be.undefined;
            expect(user.email).to.be.equal("admin@admin.com");
          });
      });
    

    })
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

          it('When email is not a String', async () => {
            const user = {
              email: 123,
              password: '123456'
              };

            await chai.request(app)
              .post('/login')
              .send(user)
              .then((res: Response) => {
                expect(res.status).to.equal(422);
                expect(res.body.message).to.equal('email must be a string');
              });
            });
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

        it('When password is incorrect', async () => {
          const user = {
            "email": "admin@admin.com",
            "password": "wrongpassword"
          };

          await chai.request(app)
            .post('/login')
            .send(user)
            .then((res: Response) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('Incorrect email or password');
            });
        })

        it('When password length is less than 6'), async () => {
          const user = {
            "email": "RonaldinhoSoccer@fifa.com",
            "password": "12345"
          };

          await chai.request(app)
            .post('/login')
            .send(user)
            .then((res: Response) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('Incorrect email or password');
            });
        }
      })
    })
})
