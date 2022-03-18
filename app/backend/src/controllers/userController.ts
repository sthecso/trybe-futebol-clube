import * as express from 'express';
import signToken from '../utils/tokenHelper';
import userServices from '../services/userServices';

const userController = {
  loginUser: async (req: express.Request, res: express.Response) => {
    const user = await userServices.loginUser(req.body);
    if (user) {
      const token = await signToken(user.role);
      return res.status(200).send({ user, token });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  },
};

export default userController;
