const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    modelName = '',
    
    salaryModel = new Schema({
        currency: { type:String, trim: true, maxlength: 20 },
        amount: { type: number, min: 0, default: null },
        per: { type: String, trim: true, maxlength: 20}
    }, {_id: false}),
    
    managerModel = new Schema({
        reference: {type: mongoose.Types.ObjectId, ref: 'employers'}, 
    }, {_id: false}),

    model =  mongoose.model(modelName, new Schema({
        title: {type: String, required: true, maxlength: 50, trim: true },
        category: {type: String, required: true, maxlength: 50 },
        additional_info: { type: String, trim: true },
        title: {type: String, required: true, maxlength: 50 },
        salary: salaryModel, 
        manager_info: managerModel,
        total_applicants: [
            new mongoose.Schema({
                reference: {type: mongoose.Types.ObjectId, ref: 'job_seekers'}
            },{_id: false})
        ],
        invitation_link: {type: String},
        location: {type: Object}
    }))

module.exports = model;