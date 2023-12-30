const mongoose = require('mongoose')

const Schema = mongoose.Schema


// create a definite structure for the Doctor object (Schema)
const reviewSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }, 
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    starRating: {
        type: Number, 
        required: true}, 
    reviewText: {
        type: String,
        required: true}, 
}, {timestamps: true});


// create a Doc Model from the schema 
const ReviewModel = mongoose.model('Review', reviewSchema)

// export it for others to use 
module.exports = ReviewModel