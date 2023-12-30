// Profile.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../../css/Myprofile.css';  // Updated CSS file path
import { DisplayReviewsByPatient } from '../../Review/displayReviewsByPatient';
import { ShowPatientAppt } from '../../displayPatientAppointments';



function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [medicalHistoryInput, setMedicalHistoryInput] = useState('');

  useEffect(() => {
    async function fetchData(id) {
      try {
        const response = await fetch(`http://localhost:8000/patientCURD/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setDoctorData(data);
        setMedicalHistoryInput(data.patients.medicalHistory || ''); // Set medical history from data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await fetch(`http://localhost:8000/patientCURD/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Redirect to a confirmation or home page after successful deletion
          navigate(`/`);
        } else {
          console.error('Error deleting profile');
          // Handle the error as needed
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        // Handle the error as needed
      }
    }
  };

  const handleHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/patientCURD/${id}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicalHistory: medicalHistoryInput }), // Ensure this is correctly structured
      });
  
      if (response.ok) {
        // Assuming the server returns the updated patient data
        const updatedPatientData = await response.json();
        setDoctorData({ ...doctorData, patients: updatedPatientData });
  
        // Show alert on successful update
        alert('Medical history updated successfully!');
      } else {
        console.error('Error updating medical history');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Error updating medical history:', error);
      // Handle the error as needed
    }
  };

  return (
    <>
    <div className="profile-container">
      <div className="profile-content">
        {doctorData ? (
          <div>
            <h1>Patient Profile</h1>
            <div className="profile-info">
              {doctorData.patients && (
                <div>
                  <p>First Name: {doctorData.patients.firstName}</p>
                  <p>Last Name: {doctorData.patients.lastName}</p>
                  <p>Gender: {doctorData.patients.gender}</p>
                  <p>Email: {doctorData.patients.email}</p>
                  <p>Password: {doctorData.patients.password}</p>
                  <p>Address: {doctorData.patients.address}</p>
                  <p>Phone: {doctorData.patients.phone}</p>

                  {/* Text area for entering medical history */}
                  <label htmlFor="medicalHistory">Medical History:</label>
                  <textarea
                    id="medicalHistory"
                    value={medicalHistoryInput}
                    onChange={(e) => setMedicalHistoryInput(e.target.value)}
                  />

                  {isEditing ? (
                    setIsEditing(true)
                    
                  ) : (
                    <button
                      onClick={() => navigate(`/patient/${id}/edit`)}
                      className="profile-button"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="profile-button"
                  >
                    Delete Profile
                  </button>
                  <button
                    onClick={handleHistory}
                    className="profile-button"
                  >
                    Update Medical History
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>


    </div>
    <div
    style={{
      padding: "20px",
      paddingBottom: "80px"

    }}>    <ShowPatientAppt></ShowPatientAppt></div>

    <div
        style={{
          padding: "20px",
          paddingBottom: "40px"
    
        }}
    
    ><DisplayReviewsByPatient patId={id}></DisplayReviewsByPatient>  </div>


    </>
  );
}

export default Profile;
