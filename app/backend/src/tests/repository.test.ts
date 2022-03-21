import * as sinon from 'sinon';
import * as chai from 'chai';

// Import Repositories
import { userRepo } from '../app/repositories/user.repository';

const { expect } = chai;

describe('Testing User Repository', () => {
  describe('Login by email and password', () => {
    it("If don't find any results", async () => {
      const payload = {
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      };
      const result = await userRepo.login(payload);
      expect(result).to.be.false;
    });

    it('If password is wrong', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'test123',
      };
      const result = await userRepo.login(payload);
      expect(result).to.be.false;
    });

    it('If user exist', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const result = await userRepo.login(payload);
      expect(result).to.be.an('object');
      expect(result).to.have.all.keys('email', 'id', 'role', 'username');
    });
  });
});
