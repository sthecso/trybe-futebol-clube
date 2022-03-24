import { z } from 'zod';

const defaultError = 'All fields must be filled';

const loginSchema = z.object({
  email: z.string({
    required_error: defaultError,
    invalid_type_error: defaultError,
  }).nonempty({ message: defaultError }),
  password: z.string({
    required_error: defaultError,
    invalid_type_error: defaultError,
  }).nonempty({ message: defaultError }),
});

export default loginSchema;
