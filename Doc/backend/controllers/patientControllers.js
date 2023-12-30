
const Patient = require('../models/Patient');
const Review = require('../models/Review');
const mongoose = require('mongoose')

const getAllPatient = async(req, res) =>{
    try{
        let query_filter = {};
        if (req.query.firstName) {
        query_filter.firstName = req.query.firstName;

        console.log('FILTER: '+query_filter.firstName)
        }
               // so if there are no filter,this willl be empty and it will get all docs 
              //                               \/
        const patients = await Patient.find(query_filter).sort({createdAt:-1})// gets all the doctors (leaving the filter blank) and sorts the newest one on top
        res.status(200).json(patients)
    }
    catch{
        
        res.status(500).json("error")
    }
}


const getPatient = async(req, res) =>{
    
    const{id} = req.params // /:id 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such patients'})
    }

    const patients = await Patient.findById(id);

    if(!patients){
        return res.status(404).json({error: 'No such patients'})
    }

    res.status(200).json({patients}) // send the doctor we find    

}

const createPatient = async(req, res)=>{
    
    const{password, address, phone, email, firstName, lastName, gender} = req.body;
    const patientInfo = {password, address, phone, email, firstName, lastName, gender}; 

    try{
        const patients = await Patient.create(patientInfo);
        res.status(200).json(patients);
    }
    catch (error) {
        console.log(error)

        
    }

}

const deletePatient = async(req, res)=> {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such patients'})
    }
    const patients = await Patient.findOneAndDelete({_id: id})

    if(!patients){
        return res.status(400).json({error: 'No such patient'})
    }
    const reviewsByPatient = await Review.deleteMany({patientId: id});
    res.status(200).json(patients)
}


const updatePatient = async(req, res) =>{
    const {id} = req.params
    const{firstName, gender, password, phone, email, lastName, address} = req.body; 
    console.log('Received Data:', req.body);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such patient'})
    }

    const patients = await Patient.findByIdAndUpdate({_id:id}, {
        firstName: firstName,
        gender: gender,
        lastName: lastName,
        password: password, 
        address: address, 
        phone: phone, 
        email: email

    })

    if(!patients){
        return res.status(400).json({error: 'No such patient'})
    }

    res.status(200).json(patients)
}



    const createMedicalHistory = async (req, res) => {
        const { id } = req.params;
        const { medicalHistory } = req.body;
      
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid patient ID' });
        }
      
        try {
          const updatedPatient = await Patient.findByIdAndUpdate(
            { _id: id },
            { medicalHistory },
            { new: true }
          );
      
          if (!updatedPatient) {
            return res.status(400).json({ error: 'No such patient' });
          }
      
          res.status(200).json(updatedPatient);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      module.exports = {
        createPatient,
        getAllPatient,
        getPatient,
        deletePatient,
        updatePatient,
        createMedicalHistory,
      };
      
