const express = require('express')

const{
    createDoctor, 
    getAllDoctors, 
    getDoctor, 
    deleteDoctor,
    updateDoctor,
    getDoctorReviews
}=require('../controllers/doctorControllers') 

const router = express.Router()


router.get('/', getAllDoctors)

router.post('/', createDoctor)

router.get('/:id', getDoctor)

router.delete('/:id', deleteDoctor)

router.patch('/:id', updateDoctor)

module.exports = router; 