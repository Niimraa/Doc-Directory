// import the Doctor Model 
const Doctor = require('../models/Doctor');
const Review = require('../models/Review');
const mongoose = require('mongoose')

// if filters => get all docs that matches the filer, : else get ALL docs
const getAllDoctors = async (req, res) => {
    try {
      // Initialize the filter object with an empty filter
      const filter = {};
  
      // Handle the speciality filter
      if (req.query.speciality && req.query.speciality !== 'None') {
        filter.speciality = req.query.speciality;
      }
  
      // Handle the gender filter
      if (req.query.gender && req.query.gender !== 'None') {
        filter.gender = req.query.gender;
      }
  
      // Handle the experience filter
      if (req.query.experience && req.query.experience !== 'None') {
        const experienceRange = req.query.experience.match(/(\d+)\s*-\s*(\d+)\s*years/);
        if (experienceRange) {
          const minExperience = parseInt(experienceRange[1]);
          const maxExperience = parseInt(experienceRange[2]);
          filter.yearsExperience = { $gte: minExperience, $lte: maxExperience };
        }
      }
  
      // Query the database with the constructed filter
      const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
  
      res.status(200).json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json("Error");
    }
  };
  


// get a doctor by ID 
// when a doctor is created, it is assigned with an unique ID 
const getDoctor = async(req, res) =>{
    
    // get the doctor ID that is passed in the URL 
    const{id} = req.params // /:id 

    // if the id is not mongoose valid (like 12 or 24 character long or not)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such doctor'})
    }

    const doctor = await Doctor.findById(id);

    // if no doctor found by that id 
    if(!doctor){
        return res.status(404).json({error: 'No such doctor'})
        // if we dont return it will run the rest of the code which we dont want it to 
    }

    res.status(200).json({doctor}) // send the doctor we find    

}

//create a new Doctor 
const createDoctor = async(req, res)=>{
    console.log("This is req body: "+JSON.stringify(req.body))
    // get all the required doctor information from req.body
    const{clinicAddress,password, gender, lastName, phone, email, firstName, speciality, yearsExperience} = req.body;
    const doctorInfo = {password, clinicAddress, phone, email, firstName, speciality, yearsExperience, gender, lastName}; 

    // add doctor to the db 
    try{
        const doctor = await Doctor.create(doctorInfo);
        res.status(200).json(doctor);
    }
    catch (error) {
        console.log(error)

        
    }

}


// delete a doctor 
const deleteDoctor = async(req, res)=> {
    const {id} = req.params // grabbing the id from the URL /:id from the params since thats where the params are stored
    
    // if the id is not mongoose valid (like 12 or 24 character long or not)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such doctor'})
    }
    const doctor = await Doctor.findOneAndDelete({_id: id})

    if(!doctor){
        return res.status(400).json({error: 'No such doctor'})
    }
    const reviewsForDoctor = await Review.deleteMany({doctorId: id});
    res.status(200).json(doctor)
}


// update doctor 
const updateDoctor = async(req, res) =>{
    const {id} = req.params
    const{firstName, lastName, password, clinicAddress, gender, phone, email, speciality, yearsExperience} = req.body; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such doctor'})
    }

    // update the necessary fields 
    
    const doctor = await Doctor.findByIdAndUpdate({_id:id}, {
        firstName: firstName,
        lastName: lastName,
        password: password, 
        gender: gender,
        clinicAddress: clinicAddress, 
        phone: phone, 
        email: email, 
        speciality: speciality,
        yearsExperience: yearsExperience

    })

    // if doc not created 
    if(!doctor){
        return res.status(400).json({error: 'No such doctor'})
    }

    // else send the updated doc as res 
    res.status(200).json(doctor)

}



module.exports = {
    createDoctor, 
    getAllDoctors, 
    getDoctor, 
    deleteDoctor, 
    updateDoctor,
}
