const 
    express = require('express'),
    router = express.Router(),
    JobJoint = require('../../joints/jobs.joints');
    
    addJob = async (request, response) => {
        let {
            title = null, category = null, additional_info = '',
            contract = null, salary = null, manager_info = null,
            total_applicants = [], location = {}, invitation_link = null
        }

        let jobModel = {
            title, category, additional_info, contract, 
            salary, manager_info, total_applicants, location, invitation_link
        }

        try {
            const {status, body} = await JobJoint.save(jobModel);
            res.status(status).send(body);

        } catch( e ){
            console.error(e);
        }
    };

router.post('/add', addJob);
module.exports = router;