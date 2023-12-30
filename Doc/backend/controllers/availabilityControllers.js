// import the Availability Model 
const Availability = require('../models/Availability');
const mongoose = require('mongoose')



//create a new Availability 
const createAvailability = async(req, res)=>{
    // get all the availability information from req.body
    const{doctorId, availableDates } = req.body;
    const availabilityInfo = {doctorId, availableDates}; 
    // add availability to the db 
    try{
        const availability = await Availability.create(availabilityInfo);
        res.status(200).json(availability);
    }
    catch (error) {
        console.log(error)     
    }  
}

// // get availability by doctor ID
// const getAvailability = async(req, res) =>{    
//       try{
//         const availability = await Availability.findOne({ doctorId: req.params });
//         res.status(200).json(availability.availableDates);

//       }catch(error){
//         console.error(err);
//       }
//     }

// delete availability by doctor ID
const deleteAvailability = async(req, res) =>{    
    try{
      const availability = await Availability.deleteOne({doctorId: req.params});
      res.status(200).json(availability);

    }catch(error){
      console.error(err);
    }
  }

// get availability by doctor ID
const getAvailableDates = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // Assuming the parameter is named "doctorId" in the route
    const availability = await Availability.findOne({ doctorId: doctorId });
    if (availability) {
      res.status(200).json(availability.availableDates);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // Assuming the parameter is named "doctorId" in the route
    const availability = await Availability.findOne({ doctorId: doctorId });
    if (availability) {
      res.status(200).json(availability);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



  // const updateAvailability = async(req, res) =>{
  //   try{
  //   const{doctorId, availableDates } = req.body;

  //   //const filter = { doctorId: req.params };
  //   const filter = { doctorId: req.params.doctorId };

  //   // update the value of the 'quantity' field to 5

  //   const updateDocument = {
  //      $set: {
  //         availableDates: availableDates,
  //      },
  //   };
  //   const result = await Availability.updateOne(filter, updateDocument);
  //   res.status(200).json(availableDates);

  // }
  // catch (error){
  //   console.error(error);
  // }

  // }

  const updateAvailability = async (req, res) => {
    try {
      const { doctorId, availableDates, bookedDates } = req.body;
  
      // Define the filter to search for an existing document with the given doctorId
      const filter = 
      { doctorId: doctorId,
        availableDates: { $ne: availableDates },
      
      };
  
      // Define the update operation
      const updateDocument = {
        $set: {
          availableDates: availableDates,
        },
        $push: {
          bookedDates: bookedDates,
        },
      };
  
      // Use findOneAndUpdate with upsert option to update or create a new document
      const options = {
        upsert: true, // Create a new document if it doesn't exist
        new: true, // Return the updated or newly created document
      };
  
      const result = await Availability.findOneAndUpdate(filter, updateDocument, options);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }

  };
  

  const removeDate = async (req, res) => {
    try {
      const { doctorId, availableDates, bookedDateToRemove } = req.body;
  
      // Define the filter to search for an existing document with the given doctorId
      const filter = {
        doctorId: doctorId,
        availableDates: { $ne: availableDates },
      };
  
      // Define the update operation
      const updateDocument = {
        $set: {
          availableDates: availableDates,
        },
        $pull: {
          bookedDates: bookedDateToRemove,
        },
      };
  
      // Use findOneAndUpdate with upsert option to update or create a new document
      const options = {
        upsert: true, // Create a new document if it doesn't exist
        new: true, // Return the updated or newly created document
      };
  
      const result = await Availability.findOneAndUpdate(filter, updateDocument, options);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



module.exports = {
    createAvailability, getAvailableDates, deleteAvailability, updateAvailability, getAvailability, removeDate
}
