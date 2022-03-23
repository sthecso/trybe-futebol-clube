import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
chai.use(chaiHttp);

const { expect } = chai;

// describe('Testa auth/validateJWT.ts,', () => {
//   let chaiHttpResponse: Response;
//   before(async () => {
//     sinon
//       .stub(jwt, "verify")
//       .resolves(() => {
//         throw new Error('Token not found')
//       })
//   });

//   after(()=>{
//     (jwt.verify as sinon.SinonStub).restore();
//   });

//   it('E verificado se o token não existir a reposta de status e 401', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .get('/login/validate')
//        .set('authorization', 'algumTokenJwtAleatório')
//        .send({})
//        .then((res) => {
//          expect(res.status).to.be.equal(401);
//        }).catch((err) => {
//          throw err
//        }) as unknown as Response;
//   });
// })