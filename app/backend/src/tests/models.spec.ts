import * as sinon from 'sinon';
import * as chai from 'chai';
import { Model } from 'sequelize';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { User, Club, Match } from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const tokenExpression = /^ey[\w-]+\.ey[\w-]+\.[\w-]+$/

describe('Testa implementação do modelo User', () => {
  it('Modelo User está bem definido', () => {
    expect(User).not.to.be.undefined;
    expect(User).to.be.a('function');
  });
  it('Modelo User tem um método de inserir dados na tabela', () => {
    expect(User).to.have.property('create');
  });
  it('Modelo User tem um método de ler dados da tabela', () => {
    expect(User).to.have.property('findOne');
  });
  it('Modelo User tem um método de atualizar dados da tabela', () => {
    expect(User).to.have.property('update');
  });
  it('Modelo User tem um método de remover dados da tabela', () => {
    expect(User).to.have.property('destroy');
  });
});

describe('Testa implementação do modelo Club', () => {
  it('Modelo Club está bem definido', () => {
    expect(Club).not.to.be.undefined;
    expect(Club).to.be.a('function');
  });
  it('Modelo Club tem um método de inserir dados na tabela', () => {
    expect(Club).to.have.property('create');
  });
  it('Modelo Club tem um método de ler dados da tabela', () => {
    expect(Club).to.have.property('findOne');
  });
  it('Modelo Club tem um método de atualizar dados da tabela', () => {
    expect(Club).to.have.property('update');
  });
  it('Modelo Club tem um método de remover dados da tabela', () => {
    expect(Club).to.have.property('destroy');
  });
});

describe('Testa implementação do modelo Match', () => {
  it('Modelo Match está bem definido', () => {
    expect(Match).not.to.be.undefined;
    expect(Match).to.be.a('function');
  });
  it('Modelo Match tem um método de inserir dados na tabela', () => {
    expect(Match).to.have.property('create');
  });
  it('Modelo Match tem um método de ler dados da tabela', () => {
    expect(Match).to.have.property('findOne');
  });
  it('Modelo Match tem um método de atualizar dados da tabela', () => {
    expect(Match).to.have.property('update');
  });
  it('Modelo Match tem um método de remover dados da tabela', () => {
    expect(Match).to.have.property('destroy');
  });
});

describe('Verifica se o usuário fez login', () => {
  /*
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
  */
  // password: secret_user
  it('Procura um usuário no banco de dados', async () => {
    const { dataValues: user } = await User.findOne({ where: { id: 2 } }) as any;
    expect(user).not.to.be.undefined;
    expect(user).to.be.an('object');
    expect(user).to.have.property('id');
    expect(user).to.have.property('username');
    expect(user).to.have.property('role');
    expect(user).to.have.property('email');
    expect(user).to.have.property('password');
  });
});
