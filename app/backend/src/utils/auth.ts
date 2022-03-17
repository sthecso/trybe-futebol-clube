import { sign, verify } from 'jsonwebtoken';
import * as fs from 'fs';
import { NextFunction, Request, Response } from 'express';

class AuthService {
  private _secret: string = fs.readFileSync('./jwt.evaluation.key', 'utf8');

  public async sign(payload: object): Promise<string> {
    return sign(payload, this._secret, {
      expiresIn: '1h',
    });
  }

  public async verify(token: string) {
    return verify(token, this._secret);
  }

  public async verifyRoute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
      });
    }
    try {
      const decoded = await this.verify(token);
      req.body.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'Invalid token',
      });
    }
  }
}

export default new AuthService();
