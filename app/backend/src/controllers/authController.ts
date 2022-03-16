import { Request, Response } from 'express';
import userValidation from '../validations/userValidation';

export default {
  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = await userValidation.bodyLogin(req.body);

    // resposta temporária para testar a validação
    res.status(200).json({ email, password });
  },
};
