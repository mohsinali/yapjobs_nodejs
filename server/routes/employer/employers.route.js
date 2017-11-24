const
    express = require('express'),
    router = express.Router(),
    EmployersJoint = require('../joints/employers.joint'),
    // EmployerJobs = require(),
    { commonCallback, checkTokenInRequest } = require('../utils/common.utils');



// router.use('/jobs', )