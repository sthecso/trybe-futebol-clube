import * as sinon from 'sinon';
import * as chai from 'chai';
import { Model } from 'sequelize';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { User } from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const tokenExpression = /^ey[\w-]+\.ey[\w-]+\.[\w-]+$/

// describe('Verifica se o usuário fez login', () => {
//   /*
//   {
//     id: 2,
//     username: 'User',
//     role: 'user',
//     email: 'user@user.com',
//     password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
//   }
//   */
//   // password: secret_user
//   it('Procura um usuário no banco de dados', async () => {
//     const { dataValues: user } = await User.findOne({ where: { id: 2 } }) as any;
//     expect(user).to.be.an('object');
//     expect(user).to.have.property('id');
//     expect(user).to.have.property('username');
//     expect(user).to.have.property('role');
//     expect(user).to.have.property('email');
//     expect(user).to.have.property('password');
//   });
// });
