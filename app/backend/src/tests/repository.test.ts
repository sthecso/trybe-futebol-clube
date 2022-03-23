import * as sinon from 'sinon';
import * as chai from 'chai';

// Import Repositories
import { userRepo } from '../app/repositories/user.repository';
import { clubRepo } from '../app/repositories/club.repository';

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

describe('Testing Club Repository', () => {
  describe('Get all clubs', () => {
    it('Returns an array', async () => {
      const result = await clubRepo.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('Get club by id', () => {
    it('Was found a club', async () => {
      const result = await clubRepo.getById(1);
      expect(result).to.be.an('object');
      expect(result).to.have.all.keys('id', 'clubName');
    });

    it('Club was not found', async () => {
      const result = await clubRepo.getById(123);
      expect(result).to.be.false;
    });
  });
});
