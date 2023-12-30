import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from './components/Doctor Component/Navbar';
import Doctor from './pages/Doctor'

import Patient from './pages/Patient';
import RoleSelection from './pages/RoleSelection';
import LoginSignup from './pages/LoginSignup';
import PatientLogin from './pages/patientLogin';
import SearchBar from './components/Patient Component/Search Components/SearchBar';
import { useState } from 'react';

import { DocReviews } from './components/Doctor Component/Reviews/DocReviews';
import EditDoctor from './components/Doctor Component/Profile/EditDoctor';
import Myprofile from './components/Doctor Component/Profile/Myprofile';
import EditPatient from './components/Patient Component/Profile/EditPatient';
import Profile from './components/Patient Component/Profile/Profile';

import DoctorProfileSearch from './components/Patient Component/DoctorProfileFromSearch';
import DateTimePicker from './components/Appointment';
import Availability,{ApptAv} from './components/ApptAvailability'


import SearchResults from './components/Patient Component/Search Components/SearchResults';
import DoctorProfileSearched from './components/Patient Component/DoctorProfileFromSearch';
import Patients from './components/Doctor Component/Patients/Patients'
import Tasks from './components/Doctor Component/Tasks/Tasks'
import Notes from './components/Doctor Component/Notes/Notes'
import Articles from "./components/Doctor Component/Articles/Articles";
import ShowPatientAppt from './components/displayPatientAppointments';
import ShowDocAppt from './components/displayDocAppointments';
import AllArticles from "./pages/AllArticles";

function App() {
  var [availableTimesByDate, setavailableTimesByDate] = useState({});
  const handleSaveAvailability = (data) => {
     setavailableTimesByDate(data);
  };

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  


 

 

  return (
    <BrowserRouter>


    {/* Putting Navbar outside pages since we want it to appear on every page  */}
     <Navbar/> 

    <div className="pages">
      <Routes>
        {/* define all the routes here  */}

        {/* at the root folder, RoleSelection Page will show up  */}

        
        <Route path = '/patient/:patientId/Appointments' element={<ShowPatientAppt/>} ></Route>

        {/* Moved DateTimePicker into DoctorSearchPf so that booking and rating are all in the same page  */}
        {/* <Route path = '/patient/:patientId/:doctorId/Book' element={<DateTimePicker availableTimesByDate={availableTimesByDate}/>}></Route> */}

        <Route path='/' element={<RoleSelection/>}></Route>
        <Route path='/loginSignup' element={<LoginSignup/>}></Route>
        <Route path='/patientLogin' element={<PatientLogin/>}></Route>
        <Route path='/doctor/:id' element={<Doctor/>}></Route>

        <Route path='/doctor/:id/Myprofile' element={<Myprofile/>}></Route> 
        <Route path="/doctor/:id/edit" element={<EditDoctor />}></Route>
        <Route path="/doctor/doc/:doctorId/Appointments" element={<ShowDocAppt />}></Route>
        <Route path="/doctor/:doctorId/Availability" element={<ApptAv onsave={handleSaveAvailability}  />}></Route>
        <Route path="/doctor/:id/Patients" element={<Patients />}></Route>
        <Route path="/doctor/:id/Tasks" element={<Tasks />}></Route>
        <Route path="/doctor/:id/Notes" element={<Notes />}></Route>
        <Route path="/doctor/:id/Articles" element={<Articles />}></Route>
        <Route path="/doctor/:id/Reviews" element={<DocReviews />}></Route>
        {/* RoleSecection --> replace w search results  */}
        {/* <Route path='/patient/:id' element={<><Patient/><RoleSelection/></>}></Route> */}
        <Route path="/patient/:id" element={<Patient/>}></Route>
        <Route path='/patient/:id/Myprofile' element={<Profile/>}></Route>
        <Route path="/patient/:id/edit" element={<EditPatient />}></Route>

    <Route path="/allarticles" element={<AllArticles />}></Route>


        
        <Route path='/docSearchedPf/:docId/:patId' element={<DoctorProfileSearched  availableTimesByDate={availableTimesByDate}/>}></Route>




      
        
        
      </Routes>
    </div>
     </BrowserRouter>
  );
}

export default App;
