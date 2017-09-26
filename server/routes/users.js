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
                        res.status(401).send("Invalid Password");
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
        // console.log(req.body);
        let 
            fullname = req.body.fullname.trim(),
            email = req.body.department.trim(),
            contact = req.body.contact,
            password = req.body.password;
            

            generateHash(password) // return hash with 10 round salt added
                .then(hash=> {
                    let JobSeeker = new JobSeeker({
                        fullname, contact, email, password
                    }),
                    saveStudentCb = err => {
                        if(err)
                            res.status(409).send("Account Already Exists");

                        if(!err)
                            res.status(201).send("Account Created");
                    }
                    JobSeeker.save(saveStudentCb);
                        
                }).catch(err=>{
                    throw new Error(err)
                })
            
    }


router.post('/login', loginCallback);
router.post('/register', registrationCallback);

module.exports = router;