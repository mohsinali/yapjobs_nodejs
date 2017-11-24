const 
    Jobs = require('../models/jobs.model'),
    // Jobs = require('mongoose').model('jobs'),
    { commonCallback } = require('../utils/common.utils');

class JobsJoint {

    constructor(){
        console.log(`JOINT TO JOBS MADE...`);
    }

    find(query = {}, projection = {}){
        console.log('query => ', query);
        return new Promise((resolve, reject) => {
            Jobs.find(query, projection, commonCallback(resolve, reject))
        });
    }

    findById(id){
        console.log(`querying jobs for ${id} ID`);
        return new Promise((resolve, reject) => {
            Jobs.findById(id, commonCallback(resolve, reject)) 
        });
    }

    save(jobModel){
        const newJob = new Jobs(jobModel);
        new Promise((resolve, reject) => {
            newJob.save( err => {
                if(err){
                    throw new Error(err);
                    reject({status: 400, body: "Unable to save Job"});
                }
                resolve({status: 200, body: "Job Added"});                
            })
        });
    }

}

module.exports = new JobsJoint();