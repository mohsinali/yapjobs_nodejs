const
    express = require('express'),
    router = express.Router(),
    getJobsHandler = (req, res, next) => {
        const filters = req.query;

        res.status(200).send(filters);
    };


router.get('/', getJobsHandler);

module.exports = router;