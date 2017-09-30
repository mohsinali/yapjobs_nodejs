const 
    promisify = require('util.promisify'),
    jwt = require('jsonwebtoken');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);
module.exports = {
    signJWT, verifyJWT
}
