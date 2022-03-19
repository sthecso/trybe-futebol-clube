import * as express from 'express';
import { compareSync } from 'bcryptjs';
import { signToken, verifyToken } from '../utils/tokenHelper';
import userServices from '../services/userServices';

const userController = {
  loginUser: async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await userServices.getByEmail(email);

    const isPasswordValid = user && compareSync(password, user.password);

    if (isPasswordValid) {
      const token = signToken({ role: user.role });
      return res.status(200).send({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  },
  validateLogin: async (req: express.Request, res: express.Response) => {
    const { authorization } = req.headers;

    if (authorization) {
      const payload = verifyToken(authorization);
      const { role } = payload;
      return res.status(200).send(role);
    }
    return res.status(401).send('Unauthorized');
  },
};

export default userController;
