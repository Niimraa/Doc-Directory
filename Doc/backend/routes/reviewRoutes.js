const express = require('express')

const{
    createReview, 
    deleteReview,
    getReviewbyDoctor,
    getReviewbyPatient,
    updateReview,
}=require('../controllers/reviewControllers') 

const router = express.Router()


router.post('/', createReview)

router.delete('/:id', deleteReview)

router.get('/doc/:id', getReviewbyDoctor)

router.get('/pat/:id', getReviewbyPatient)

router.patch('/:id', updateReview)

module.exports = router; 