const
    JobSeeker = require('../models/job-seeker.model');

class JobSeekerJoint {
    constructor(){
        console.log(`JOB SEEKER JOINT INVOKED @${Date.now()}`);
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

    saveJobSeeker(jobSeekerModel){
        const jobSeeker = new JobSeeker(jobSeekerModel);
        console.log('job seeker: ', jobSeeker)
        console.log('job seeker model: ', jobSeekerModel)
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