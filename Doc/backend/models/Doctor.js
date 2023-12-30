const mongoose = require('mongoose')

const Schema = mongoose.Schema


// create a definite structure for the Doctor object (Schema)
const doctorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    gender: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true},
    clinicAddress: {
        type: String, 
        required: true}, 
    phone: {
        type: Number,
        required: true}, 
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    
    speciality: {
        type: String,
        required: true
    },
    
    yearsExperience: {
        type: Number, 
        required: true
    },
}, {timestamps: true});

// create a Doc Model from the schema 
const DocModel = mongoose.model('Doctor', doctorSchema)

// export it for others to use 
module.exports = DocModel