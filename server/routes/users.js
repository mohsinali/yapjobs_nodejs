const 
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    saltRounds = 10, 
    JobSeekerJoint = require('../joints/job-seekers.joints'),
    jwt = require('jsonwebtoken'),
    // promisify = require('util.promisify'),
    generateHash = (password)=>{
        console.log(`password about to encrypt: ${password}`);
        return new Promise((resolve, reject)=>{
            bcrypt.hash(password, saltRounds)
                .then(hash => { resolve(hash) })
                .catch(err => { reject( err ) });
        })
    },
    loginHandler = (req, res, next)=> {
        console.log('body: ',req.body);
        
        // should be handled with complete validators.
        // validator for data varification should be a util (and tested).
        // Try to apply NASA's rule of function (should not be longer than a page).

        if(req.body.email && req.body.password){
            const
                email = req.body.email.trim(), 
                password = req.body.password,
                recordFindCb = (err, record)=>{
                    if(err)
                        res.status(501).send("Error occured on login attempt");
                    if(!record)
                        res.status(401).send("No Such Account Exists")
                };
                // req.body.email ? // check if email exists on http call. 
                
                    JobSeekerJoint.checkIfUserExists(req.body.email) 
                        .then(record => {
                            console.log('record found for email: ', record);
                            typeof record.body === 'object' ? 
                                bcrypt.compare(password, record.body.password)
                                    .then( passwordMatched => {
                                        passwordMatched ?
                                            res.status(202).send('Access Granted') 
                                            :
                                            res.status(401).send('Invalid Password');
                                    })
                                    .catch(err => {
                                        res.status(500).send('Error at password match');
                                    })
                                : 
                                res.status(401).send('No record for such email');
                        })
                        .catch(err=>{
                            res.status(401).send('No record for such email');
                        })
            } else {
                res.status(401).send('Email and Password Required');
            }
    },

    registrationHandler = (req, res, next)=> {
        let 
            fullname = req.body.fullname.trim(), //must contain
            email = req.body.email.trim(), //must contain
            contact = req.body.contact, //must contain
            password = req.body.password; //must contain
            
            generateHash(password) // return hash with 10 round salt added
                .then(hash=> {
                    console.log(`password-hash ${password}-${hash}`);
                    const jobSeekerModel = {
                        fullname, email, contact, password: hash
                    }
                    JobSeekerJoint.saveJobSeeker(jobSeekerModel)
                        .then( result => {
                            res.status(201).send("User Created");
                        })
                        .catch(err=> {
                            if(err.status == 409)
                                res.status(409).send(err.body)
                            else 
                                res.status(500).send('Unable To Save Job Seeker');
                        })
                        
                }).catch(err=>{
                    throw new Error(err)
                })
            
    }


router.post('/login', loginHandler);
router.post('/register', registrationHandler);

module.exports = router;