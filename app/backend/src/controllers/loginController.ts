import users from '../database/models/users';
import { Request, Response } from 'express';

module.exports = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email, password }, raw: true });
    if (!user) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = createToken(user)
    return res.status(200).json({ user, token });
  } catch (err: any) {
    console.log(err.message);
    return res.status(401).json({ message: 'Deu ruim patrão' });
  }
}