const mongoose = require('mongoose')
const Review = require('../models/Review');

const createReview = async(req, res)=>{
    try{
        const review = await Review.create(req.body);

        res.status(200).json(review);
    }
    catch (error) {
        console.log(error)
    }

}

const deleteReview = async(req, res)=> {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Id not a valid Id'})
    }
    const review = await Review.findById({_id: id})
    if(!review){
        return res.status(400).json({error: 'No such review'})
    }
    await Review.deleteOne({_id: review._id});

    res.status(200).json(review)
}

const getReviewbyDoctor = async(req, res) =>{
    
    const{id} = req.params 

     if(!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({error: 'Id is not valid'})
     }

    const reviews = await Review.find({doctorId: id}).populate('patientId');
    
    if(!reviews){
        return res.status(404).json({error: 'No reviews for that doctor'})
    }

    res.status(200).json({reviews}) 

}

const getReviewbyPatient = async(req, res) =>{
    
    const{id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Id is not valid'})
    }

    const reviews = await Review.find({patientId: id}).populate('doctorId');

    if(!reviews){
        return res.status(404).json({error: 'No reviews for that patient'})
    }

    res.status(200).json({reviews})   

}

const updateReview = async(req, res) =>{
    const {id} = req.params
    const{starRating, reviewText} = req.body; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Id is not valid'})
    }

    
    const review = await Review.findOneAndUpdate({_id:id}, {$set: {starRating: starRating, reviewText: reviewText}})

    if(!review){
        return res.status(400).json({error: 'No such review'})
    }

    res.status(200).json(review)

}

module.exports = {
    createReview, 
    deleteReview, 
    getReviewbyDoctor,
    getReviewbyPatient,
    updateReview,
}
