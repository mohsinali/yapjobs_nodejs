
const 
    jwt = require('jsonwebtoken'),
    {signJWT, verifyJWT} = require('./promisify.utils');

class CryptoUtils {
    constructor(){
        console.log('JOINT TO CRYPTO UTILS MADE...');
    }    

    assignStandardJWT(
        payload = {},
        algorithm = process.env.ENC_TYPE,
        ){
        const claims = {
            algorithm,
            expiresIn: 60*60,
            subject: payload.email || null,
            jwtid: payload.id || null
        }
        return signJWT(payload, process.env.SECRET_KEY , claims);
    }
    
}

module.exports = new CryptoUtils();