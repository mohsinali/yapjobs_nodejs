const
    JobSeeker = require('../models/job-seeker.model');

class JobSeekerJoint {
    constructor(){
        console.log(`JOB SEEKER JOINT INVOKED @${Date.now()}`);
    }

    checkIfUserExists(email){
        const responseParams= {
                __v: false,
                created: false,
                fullname: false
            };

        return new Promise((resolve, reject) => {
            JobSeeker.findOne({email: email}, responseParams)
                .then(body=>{
                    '_id' in body ? 
                        resolve({status: 200, body })
                        :
                        resolve({status: 404, body: 'NOT_FOUND'})
                 })
                .catch(err => { reject (err) })
        });
    }

    saveJobSeeker(jobSeekerModel){
        const jobSeeker = new JobSeeker(jobSeekerModel);
        return new Promise((resolve, reject) => {
            let saveStudentCb = err=> {
                err ?
                    reject({status: 409, body: "Account Already Exists"})
                    :
                    resolve({status:201, body: "Account Created Successfully"});
            }
            jobSeeker.save(saveStudentCb);
        });
    }

}

module.exports = new JobSeekerJoint();