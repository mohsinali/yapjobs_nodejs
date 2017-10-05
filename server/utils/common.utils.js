const 
    mongooseTypes = require('mongoose').Types,
    jwt = require('jsonwebtoken'),
    { verifyJWT } = require('./promisify.utils');

class CommonUtils {
    isObjectId(id){
        return mongooseTypes.ObjectId.isValid(id);
    }

    checkTokenInRequest(){
        return (request, response, next)=>{
            const token = request.cookies.YAPSESSION;
            verifyJWT(token.toString(), process.env.SECRET_KEY)
                .then(verified =>{
                    next();
                    console.log('is Token Verified: ', verified);
                })
                .catch(err => {
                    if(err.message === 'jwt expired')
                        response.status(403).send('Token/Session Expired');
                    else 
                        response.status(403).send('Oops! Seems like some problem with token');
                })
        }
    }
}

module.exports = new CommonUtils();