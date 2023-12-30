const express = require('express')

const{
    createPatient, 
    getAllPatient, 
    getPatient, 
    deletePatient,
    updatePatient,
    createMedicalHistory
}=require('../controllers/patientControllers') 

const router = express.Router()


router.get('/', getAllPatient)

router.post('/', createPatient)

router.get('/:id', getPatient)

router.delete('/:id', deletePatient)

router.post('/:id/history', createMedicalHistory);

router.patch('/:id', updatePatient)

module.exports = router; 