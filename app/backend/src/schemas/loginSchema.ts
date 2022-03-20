import { z } from 'zod';

const loginSchema = z.object({
  email: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export default loginSchema;
