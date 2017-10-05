const 
    mongooseTypes = require('mongoose').Types,
    { verifyJWT } = require('./promisify.utils'),
    { verifyToken } = require('./crypto.utils');

class CommonUtils {
    isObjectId(id){
        return mongooseTypes.ObjectId.isValid(id);
    }

    checkTokenInRequest(){
        return (request, response, next)=>{
            const token = request.cookies.YAPSESSION;
            if(token)
                verifyToken(token)
                    .then(verified =>{
                        next();
                        console.log('is Token Verified: ', verified);
                    })
                    .catch(err => {
                        if(err.message === 'jwt expired')
                            response.status(403).send('Token/Session Expired');
                        else 
                            response.status(403).send('Oops! Invalid Session');
                    })
            else 
                response.status(403).send('You must login');
        }
    }
}

module.exports = new CommonUtils();