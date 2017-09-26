const 
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    saltRounds = 10, 
    JobSeekerJoint = require('../joints/job-seekers.joints');

    generateHash = (password)=>{
        console.log(`password about to encrypt: ${password}`);
        return new Promise((resolve, reject)=>{
            let genHashCb = (err, hash)=>{
                if(err)
                    reject(err)
                
                if(!err && hash)
                    resolve(hash)

            };
            
            bcrypt.hash(password, saltRounds, genHashCb)
        })
    },
    loginCallback = (req, res, next)=> {
        let 
            password = req.body.password,
            recordFindCb = (err, record)=>{
                if(err)
                    res.status(501).send("Error occured on login attempt");
                if(!record)
                    res.status(401).send("No Such Account Exists")
                
                let compareCb = (err, success)=>{
                    // delete record['password'];
                    if(err)
                        res.status(500).send("Unable to compare password");
                    if(!err && success){
                        record.password = null;
                        res.status(200).send(record);
                    }
                    if(!err && !success)
                        ressaveStudentCb.status(401).send("Invalid Password");
                }
            }; 
            
            req.body.email ?
                JobSeekerJoint.checkIfUserExists(req.body.email)
                    .then(record => {
                        typeof record.body === 'object' ? 
                            bcrypt.compare(password, record.password, compareCb)
                            : 
                            res.status(401).send('No record for such email');
                    })
                    .catch(err=>{
                        console.log(`GOT ERROR AT FINDING EMAIL`);
                    })
            // Student.findOne({email: req.body.email}, responseParams, recordFindCb)
            :
            res.status(404).send('Email is Required');
    },

    registrationCallback = (req, res, next)=> {
        console.log('req.body: ', req.body);
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
                    console.log('JOB SEEKER: ', jobSeekerModel)
                    JobSeekerJoint.saveJobSeeker(jobSeekerModel)
                        .then(res=> {
                            console.log(`response from save job seeker promise: `,res);
                        })
                        .catch(err=> {
                            if(err.status == 409)
                                res.status(409).send(err.body)
                            
                            res.status(500).send('Unable To Save Job Seeker');
                        })
                        
                }).catch(err=>{
                    throw new Error(err)
                })
            
    }


router.post('/login', loginCallback);
router.post('/register', registrationCallback);

module.exports = router;