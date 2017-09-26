const
    JobSeeker = require('../models/job-seeker.model');

class JobSeekerJoint {
    constructor(){
        console.log(`JOB SEEKER JOINT INVOKED @${Date.now}`);
    }

    checkIfUserExsits(email){

        const responseParams= {
                __v: false,
                created: false,
                fullname: false
            };

        return new Promise((resolve, reject) => {
            JobSeeker.findOne({email}, responseParams)
                .then(body=>{ 
                    Object.keys(body).length ? 
                        resolve({status: 404, body: 'NOT_FOUND'})
                        :
                        resolve({status: 302, body: res })
                 })
                .catch(err => { reject (err) })
        });
    }

}

module.exports = new JobSeekerJoint();