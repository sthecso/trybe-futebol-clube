import * as bcrypt from 'bcrypt';


console.log(bcrypt.hashSync('123456789', bcrypt.genSaltSync(123654)))
