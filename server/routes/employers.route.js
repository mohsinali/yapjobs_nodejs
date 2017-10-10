const
    express = require('express'),
    router = express.Router(),
    EmployersJoint = require('../joints/employers.joint'),
    { commonCallback, checkTokenInRequest } = require('../utils/common.utils');



