import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../../css/Myprofile.css';

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedData, setEditedData] = useState({
    firstName: '',
    gender: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/patientCURD/${id}`);
        if (response.ok) {
          const patientData = await response.json();
          console.log('Fetched Patient Data:', patientData);
  
          if (patientData && patientData.patients && patientData.patients.email) {
            setEditedData({
              ...patientData.patients,
              originalEmail: patientData.patients.email,
            });
          } else {
            console.error('Patient data or email is missing:', patientData);
          }
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
  
    fetchPatientData();
  }, [id]);
  
  const handleSaveClick = async () => {
    try {
      if (!isValidName(editedData.firstName) || !isValidName(editedData.lastName)) {
        setError('First name and last name should only contain letters.');
        return;
      }

      if (!editedData.firstName || !editedData.lastName || !editedData.email || !editedData.password || !editedData.address || !editedData.phone) {
        setError('Please fill in all fields.');
        return;
      }

      if (!isValidEmail(editedData.email)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (!isValidPhone(editedData.phone)) {
        setError('Please enter a valid phone number.');
        return;
      }

      // Check if the edited email is different from the original email
    if (editedData.email.toLowerCase() !== editedData.originalEmail.toLowerCase()) {
      const emailExistsResponse = await fetch('http://localhost:8000/patientCURD');
      const doctors = await emailExistsResponse.json();
      const matchingDoctor = doctors.find(
        (doctor) =>
          doctor.email &&
          doctor.email.toLowerCase() === editedData.email.toLowerCase()
      );

      if (matchingDoctor && matchingDoctor.email === editedData.email) {
        setError('Email used. Please try another email.');
        return;
      }
    }

      const response = await fetch(`http://localhost:8000/patientCURD/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        console.error('Error updating data:', response.status, response.statusText);
        throw Error('Network response was not ok');
      }

      navigate(`/patient/${id}/Myprofile`);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    return !isNaN(phone);
  };

  return (
    <div className="EditDoctorContainer">
      <h1 className="EditDoctorHeader">Edit Patient Profile</h1>
      <input
        className="EditDoctorInput"
        type="text"
        name="firstName"
        placeholder="FirstName"
        value={editedData.firstName}
        onChange={handleInputChange}
      />
      <input
        className="EditDoctorInput"
        type="text"
        name="lastName"
        placeholder="LastName"
        value={editedData.lastName}
        onChange={handleInputChange}
      />
      <input
        className="EditDoctorInput"
        type="text"
        name="email"
        placeholder="Email"
        value={editedData.email}
        onChange={handleInputChange}
      />
      <input
        className="EditDoctorInput"
        type="text"
        name="password"
        placeholder="Password"
        value={editedData.password}
        onChange={handleInputChange}
      />
      <select
        className="EditDoctorInput"
        name="gender"
        value={editedData.gender}
        onChange={handleInputChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
  className="EditDoctorInput"
  type="text"
  name="address"  // Corrected the name attribute
  placeholder="Address"
  value={editedData.address}
  onChange={handleInputChange}
/>
      <input
        className="EditDoctorInput"
        type="text"
        name="phone"
        placeholder="Phone"
        value={editedData.phone}
        onChange={handleInputChange}
      />
  
      {error && (
        <div className="errorMessage">
          {error}
        </div>
      )}

      <button
        className="EditDoctorSaveButton"
        onClick={handleSaveClick}
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          backgroundColor: 'black',
          padding: '10px 10px',
          margin: '10px 5px',
          borderRadius: '5px',
          color: '#fff',
          fontSize: '14px',
        }}
      >
        Save
      </button>

      <Link
        to={`/patient/${id}/Myprofile`}
        className="EditDoctorCancelLink"
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          backgroundColor: 'black',
          padding: '10px 10px',
          margin: '10px 5px',
          borderRadius: '5px',
          color: '#fff',
          fontSize: '14px',
          textDecoration: 'none', // For links
        }}
      >
        Cancel
      </Link>
    </div>
  );
}

export default EditPatient;
