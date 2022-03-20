const jwt = require('jsonwebtoken');

const SECRET = '1234';

const createToken = (payload: Object) => { // o payload são as infos do usuário.
    const token = jwt.sign(payload, SECRET); // o método sign cria um token recebendo as infos e uma senha criptografada.
    return token;
};

const validateToken = (token: string) => {
    const verifiedToken = jwt.verify(token, SECRET); // o método verify recebe um token existente e faz a validação.
    return verifiedToken;
};

module.exports = {
    createToken,
    validateToken,
};