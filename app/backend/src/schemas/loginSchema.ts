import { z } from 'zod';

const loginSchema = z.object({
  email: z.string({ required_error: 'All fields must be filled' }),
  password: z.string({ required_error: 'All fields must be filled' }),
});

export default loginSchema;
