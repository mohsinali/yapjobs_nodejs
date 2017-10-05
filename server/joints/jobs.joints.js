const 
    Jobs = require('../models/jobs.model'),
    commonCallback = (resolve, reject)=>{
        return (err, body)=>{  
            if(err) 
                reject({status: 500, body: err}) 
            if(!err) {
                resolve({status: 200, body});
            }
        };
    }

class JobsJoint {

    constructor(){
        console.log(`JOINT TO JOBS MADE...`);
    }

    find(query = {}, projection = {}){
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

}

module.exports = new JobsJoint();