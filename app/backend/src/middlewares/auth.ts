// // import { readFileSync } from 'fs';
// import { NextFunction } from 'express';
// import { StatusCodes } from 'http-status-codes';
// // import { IUser } from '../interfaces';

// export default class Auht {
//   public static jwt() {
//     return (req: Request, res: Response, _next: NextFunction) => {
//       const token = req.headers.authorization;

//       if (!token) {
//         return res
//           .status(StatusCodes.UNAUTHORIZED)
//           .json({ message: 'Token not found' });
//       }
//     };
//   }
// }
