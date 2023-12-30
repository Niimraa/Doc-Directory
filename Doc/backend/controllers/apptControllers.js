// import the Appointment Model 
const Appt = require('../models/Appointment');
const mongoose = require('mongoose')
const { ObjectID } = require('mongodb'); // Import ObjectID from your MongoDB library
const { query } = require('express');


 

//create a new Appointment 
const createAppt = async(req, res)=>{
    // get all the appointment information from req.body

    const{patientId, doctorId, date, startTime, endTime, concern, isCancelled, notes } = req.body;
    const appointmentInfo = {patientId, doctorId, date, startTime, endTime, concern, isCancelled, notes }; 


    // add appointment to the db 
    try{
        const appointment = await Appt.create(appointmentInfo);
        res.status(200).json(appointment);
    }
    catch (error) {
        console.log(error)     
    }  
}

// get a appointment by patient ID
const getPatientAppt = async(req, res) =>{    
      try{
        const patientId = req.params.patientId; // Assuming the parameter is named "patientId" in the route

        const appt = await Appt.find({ patientId: patientId });
        //res.status(200).json(appt);
        if (appt) {
          res.status(200).json(appt);
        } else {
          res.status(200).json([]);
        }
      }catch(error){
        console.error(error);
      }
    }


    // get a appointment by doctor ID
const getDocAppt = async(req, res) =>{    
  try{
    const doctorId = req.params.doctorId; // Assuming the parameter is named "doctorId" in the route

    const appt = await Appt.find({ doctorId: doctorId });
    //res.status(200).json(appt);
    if (appt) {
      res.status(200).json(appt);
    } else {
      res.status(200).json([]);
    }
  }catch(error){
    console.error(error);
  }
}


const cancelAppt = async(req, res) => {
  try {

    const apptId = req.params.apptId;
    console.log(apptId);
    

    //const appt = await Appt.findOneAndUpdate({_id: apptId}, {isCancelled: true}, { new: true });
    // const appt = await Appt.findOneAndUpdate(
    //   { _id: apptId },
    //   { $set: { isCancelled: !Appt.isCancelled } },
    //   { new: true }
    // );

    const appt = await Appt.findById(apptId);

    
    if (appt){
      appt.isCancelled = !appt.isCancelled; // Toggle the isCancelled field
      const updatedAppt = await appt.save();
      res.status(200).json(updatedAppt);
      //res.status(200).json(appt);
    }else{
      res.status(200).json([]);
    }
  }catch(error){
    console.error(error);

  }
}

const updateApptNotes = async (req, res) => {
  try {
     const apptId = req.params.currApptId;
     const notesValue = req.params.notesValue;

    // Define the filter to search for an existing document with the given id
    const filter = { _id:apptId };

    // Define the update operation
    const updateDocument = {
      $set: {
        notes: notesValue
      },
    };

    // Use findOneAndUpdate with upsert option to update or create a new document
    const options = {
      upsert: true, // Create a new document if it doesn't exist
      new: true, // Return the updated or newly created document
    };

    const result = await Appt.findOneAndUpdate(filter, updateDocument, options);

     res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }

}


  const getApptNotes = async (req, res) => {
    try{
      const apptId = req.params.item; // Assuming the parameter is named "doctorId" in the route

      const appt = await Appt.findOne({ _id: apptId, notes: { $exists: true } });

      if (appt && appt.notes) {
        res.status(200).json(appt.notes);
      } else {
        res.status(200).json("");
      }
    }catch(error){
      console.error(error);
    }


   };





module.exports = {
    createAppt,
    getPatientAppt,
    getDocAppt,
    cancelAppt,
    updateApptNotes,
    getApptNotes,
   
}
