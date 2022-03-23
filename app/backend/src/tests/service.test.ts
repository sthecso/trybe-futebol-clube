import * as sinon from 'sinon';
import * as chai from 'chai';

// Import Services
import { userService } from '../app/services/User';
import { clubService } from '../app/services/Club';

const { expect } = chai;

describe('Testing User Service', () => {
  describe('Login by email and password', () => {
    it("If don't find any results", async () => {
      const payload = {
        email: 'johndoe@mail.com',
        password: 'johndoe123',
      };
      const result = await userService.login(payload);
      expect(result).to.be.false;
    });

    it('If password is wrong', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'test123',
      };
      const result = await userService.login(payload);
      expect(result).to.be.false;
    });

    it('If user exist', async () => {
      const payload = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const result = await userService.login(payload);
      expect(result).to.be.an('object');
      expect(result).to.have.all.keys('user', 'token');
    });
  });

  describe('Testing Club Repository', () => {
    describe('Get all clubs', () => {
      it('Returns an array', async () => {
        const result = await clubService.getAll();
        expect(result).to.be.an('array');
      });
    });

    describe('Get club by id', () => {
      it('Was found a club', async () => {
        const result = await clubService.getById(1);
        expect(result).to.be.an('object');
        expect(result).to.have.all.keys('id', 'clubName');
      });

      it('Club was not found', async () => {
        const result = await clubService.getById(123);
        expect(result).to.be.false;
      });
    });
  });
});
