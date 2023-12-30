const express = require('express')

const{createAvailability, getAvailableDates, deleteAvailability, updateAvailability, getAvailability, removeDate}=require('../controllers/availabilityControllers') 

const router = express.Router()



router.post('/:doctorId', createAvailability) // create an availability object with doctor id

router.get('/:doctorId' , getAvailableDates ) // get availability with doctor id

router.get('/availability/:doctorId' , getAvailability ) // get availability with doctor id

router.delete('/:doctorId', deleteAvailability)

router.post('/update/:doctorId', updateAvailability)

router.post('/removedate/:doctorId', removeDate) // remove the date in the request body from the array of booked dates in the db


module.exports = router; 