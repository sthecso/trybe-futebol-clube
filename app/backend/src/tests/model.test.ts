import * as sinon from 'sinon';
import * as chai from 'chai';

// Import Models
import User from '../database/models/User';

const { expect } = chai;

describe('Testing User Model', () => {
  const userModel = User;

  describe('Find user by email and password', () => {
    it("If don't find any results", async () => {
      const payload = {
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      };
      const result = await userModel.findOne({ where: payload });
      expect(result).to.be.null;
    });

    it('If was find  a result', async () => {
      const payload = {
        email: 'admin@admin.com',
        password:
          '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      };
      const result = await userModel.findOne({ where: payload });
      expect(result).to.be.an('object');
    });
  });
});
