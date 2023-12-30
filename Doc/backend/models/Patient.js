const mongoose = require('mongoose')

const Schema = mongoose.Schema


// create a definite structure for the Doctor object (Schema)
const patientSchema = new Schema({
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

    address: {
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
    medicalHistory: {
        type: String, 
        required: false, 
    },
    
}, {timestamps: true});


// create a Doc Model from the schema 
//const patModel = mongoose.model('Patient', patientSchema)
const patModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema);


// export it for others to use 
module.exports = patModel