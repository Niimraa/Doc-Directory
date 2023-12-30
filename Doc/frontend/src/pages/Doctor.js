import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Doctor.css';

const Doctor = () => {
const navigate = useNavigate();
const { id } = useParams();
const [doctorData, setDoctorData] = useState(null);

useEffect(() => {
  async function fetchData(id) {
    try {
      const response = await fetch(`http://localhost:8000/doctorCURD/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctorData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData(id);
}, [id]);
  const navigateToPage = (page) => {
    navigate(page); // Use the navigate function to navigate
  };

  // for using the perticular sidebar go to components/Doctor component/ go for particular sidebar folder 
  return (
    <div>
      <nav className="navbar">
        <div>DASHBOARD</div>
      </nav>
      <div className="dashboard">
        <div className="sidebar">
          
          <ul>
            <li>
            <button onClick={() => navigateToPage(`/doctor/${id}/Myprofile`)}>My Profile</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/doc/${id}/Appointments`)}>My Appointments</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Availability`)}>My Availability</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Patients`)}>My Patients</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Tasks`)}>Tasks</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Notes`)}>Notes</button>
              </li> 
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Articles`)}>Articles</button>
            </li>
            <li>
              <button onClick={() => navigateToPage(`/doctor/${id}/Reviews`)}>Reviews</button>
            </li>
          </ul>
        </div>
        
    </div>
    </div>
  );
};

export default Doctor;

