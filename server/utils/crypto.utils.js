
const 
    jwt = require('jsonwebtoken'),
    {signJWT, verifyJWT} = require('./promisify.utils');

class CryptoUtils {
    constructor(){
        console.log('JOINT TO CRYPTO UTILS MADE...');
    }    

    assignStandardJWT(payload = {}, enc_type = process.env.ENC_TYPE){
        return new Promise((resolve, reject) => {
            signJWT(payload, process.env.SECRET_KEY , {
                algorithm: enc_type,
                expiresIn: 60*24
            }).then(token => {
                resolve(token)
            }).catch(err=>{
                reject(err)
            })    
        });
    }
    
    verifyJWT(token){
        try{
            let 
                decodedToken = jwt.verify(token, process.env.SECRET_KEY),
                isTokenValid = '_id' in decodedToken;
            return {
                isTokenValid,
                body: decodedToken
            };
        } catch(e){
            return {
                isTokenValid: false,
                body: "INVALID SIGNATURE"
            }
        }
    }
    
}

module.exports = new CryptoUtils();