import * as bcryptjs from 'bcryptjs';

const compare = async (password: string, passHash: string) => bcryptjs.compare(password, passHash);

export default compare;
