const
    express = require('express'),
    router = express.Router(),
    JobsJoint = require('../joints/jobs.joints'),
    {isObjectId, checkTokenInRequest} = require('../utils/common.utils'),
    getJobsHandler = (request, response) => {
        //TODO
        const 
            filters = request.query,
            projection = null;

        JobsJoint.find(filters, projection)
            .then(res => {
                let { status, body } = res;
                response.status(status).send(body);
            })
            .catch(err=> {
                console.log('ERROR AT "FINDING JOBS": ', err);
                response.status(500).send({msg: 'Error at finding jobs', err: err.body});
            })
    },
    getJobById = (request, response)=> {
        const jobId = request.params.job_id;
        
        !isObjectId(jobId) ?
            response.status(400).send('Invalid Job Id')
            :
            JobsJoint.findById(jobId)
                .then(res=>{
                    response.status(res.status).send(res.body);
                })
                .catch(err=>{
                    console.log('ERROR AT FINDING JOB BY ID: ', err);
                    response.status(500).send(err);
                });
    };



router.get('/', getJobsHandler);
router.get('/:job_id', checkTokenInRequest(), getJobById);

module.exports = router;