
const mongoose = require('mongoose')

const Schema = mongoose.Schema


// create a definite structure for the Appointment object (Schema)
const apptSchema = new Schema({
    patientId: {
        type: String, 
        require: false},
    doctorId:{
        type: String, 
        require: false},
    date:{
        type: String, 
        require: false},
    startTime:{
        type: String, 
        require: false},
    endTime:{
        type: String, 
        require: false},
    concern:{
        type: String, 
        require: false},
    isCancelled:{
        type: Boolean, 
        require: false},
    notes:{
        type: String,
        require: false},

}, {timestamps: true});


// create a Appointment Model from the schema 
const ApptModel = mongoose.model('Appt', apptSchema)

// export it for others to use 
module.exports =ApptModel