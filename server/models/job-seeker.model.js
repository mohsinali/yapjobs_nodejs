const 
    mongoose = require('mongoose'),
    collection = 'job_seekers',
    JobSeekerSchema = mongoose.Schema({
        fullname: { type: String, trim: true },
        contact: { type: String, trim:true },
        email: { type: String, trim: true },
        created: { type: Date, default: Date.now },
        password: { type: String, required: false } 
    }, {collection}),
    model = mongoose.model('job_seekers',JobSeekerSchema);

module.exports = model;