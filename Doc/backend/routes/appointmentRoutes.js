const express = require('express')

const{createAppt, getPatientAppt, getDocAppt, cancelAppt, updateApptNotes, getApptNotes}=require('../controllers/apptControllers') 

const router = express.Router()


router.post('/:patientId/:doctorId', createAppt) // create an appointment with patient id and doctor id

router.get('/:patientId' , getPatientAppt ) // get appointment with patient id

router.get('/doc/:doctorId', getDocAppt)  // get appointment with patient id

router.get('/cancel/:apptId', cancelAppt) // cancel an appointment with apptId

router.get('/notes/:currApptId/:notesValue', updateApptNotes) // update appointment notes with appt Id

router.get('/getnotes/:item', getApptNotes)


module.exports = router; 