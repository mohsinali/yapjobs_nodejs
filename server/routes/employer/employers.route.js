const
    express = require('express'),
    router = express.Router(),
    EmployersJoint = require('../../joints/employers.joint'),
    EmployerJobs = require('./employer.jobs.route'),
    { commonCallback, checkTokenInRequest } = require('../../utils/common.utils');



router.use('/jobs',EmployerJobs)
module.exports = router;