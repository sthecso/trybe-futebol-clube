import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import Match from '../database/models/User';

import { Response } from 'superagent';

const { expect } = chai;

describe('Match Model', () => {
  it('Deve retornar um match', async () => {
    const match = await Match.findOne({
      where: {
        id: 1,
      },
    });
    expect(match).to.be.an('object');
  });
});
