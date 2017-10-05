
const 
    // jwt = require('jsonwebtoken').sign(,,{}),
    { signJWT, verifyJWT } = require('./promisify.utils'),
    { readFileSync } = require('fs'),
    { join: joinPath } = require('path'),
    RSA_PRIVATE_KEY = readFileSync(joinPath(__dirname, '../bin/private.key'), 'utf8'), 
    RSA_PUBLIC_KEY = readFileSync(joinPath(__dirname, '../bin/public.key'), 'utf8');

class CryptoUtils {
    constructor(){  
        console.log('JOINT TO CRYPTO UTILS MADE...');
    }    

    assignStandardJWT(payload = {}, algorithm = process.env.ENC_TYPE){
        console.log("payload: ", payload)
        const claims = {
            algorithm: 'RS256',
            expiresIn: '1h'
        }

        return signJWT(payload, RSA_PRIVATE_KEY, claims);
    }

    verifyToken(token){
        return verifyJWT(token, RSA_PUBLIC_KEY);
    }
    
}

module.exports = new CryptoUtils();