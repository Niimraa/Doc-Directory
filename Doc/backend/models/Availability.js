const mongoose = require('mongoose')

const Schema = mongoose.Schema


// create a definite structure for the Availability object (Schema)
const availabilitySchema = new Schema({

    doctorId:{
        type: String, 
        require: true},
    availableDates:{
        type: [String], 
        require: true},
    bookedDates: {
        type: [String], 
        require: false},

}, {timestamps: true});


// create a Availability Model from the schema 
const AvailabilityModel = mongoose.model('Availability', availabilitySchema)

// export it for others to use 
module.exports =AvailabilityModel