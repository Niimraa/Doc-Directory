import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../../css/Myprofile.css';

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    clinicAddress: '',
    phone: '',
    speciality: '',
    yearsExperience: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the current doctor data when the component mounts
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/doctorCURD/${id}`);
        if (response.ok) {
          const doctorData = await response.json();
          // Set the initial state with the fetched data
          setEditedData({
            ...doctorData.doctor,
            originalEmail: doctorData.doctor.email,
          });
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [id]);

  const handleSaveClick = async () => {
    try {
      if (!isValidName(editedData.firstName) || !isValidName(editedData.lastName)) {
        setError('First name and last name should only contain letters.');
        return;
      }
  
      if (!editedData.firstName || !editedData.lastName || !editedData.email || !editedData.password || !editedData.clinicAddress || !editedData.phone || !editedData.speciality || !editedData.yearsExperience) {
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
      const emailExistsResponse = await fetch('http://localhost:8000/doctorCURD');
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
  
      // Continue with the save logic if email is unique
      const response = await fetch(`http://localhost:8000/doctorCURD/${id}`, {
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
  
      navigate(`/doctor/${id}/Myprofile`);
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
      <h1 className="EditDoctorHeader">Edit Doctor Profile</h1>
      <input
        className="EditDoctorInput"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={editedData.firstName}
        onChange={handleInputChange}
      />
      <input
        className="EditDoctorInput"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={editedData.lastName}
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
      <input
        className="EditDoctorInput"
        type="text"
        name="clinicAddress"
        placeholder="Clinic Address"
        value={editedData.clinicAddress}
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
      <select
  className="EditDoctorInput"
  name="speciality"
  value={editedData.speciality}
  onChange={handleInputChange}
>
  <option value="">Select Speciality</option>
  <option value="Primary Care">Primary Care</option>
  <option value="Dentist">Dentist</option>
  <option value="Orthodontist">Orthodontist</option>
  <option value="General Surgeon">General Surgeon</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
  <option value="Pediatrician">Pediatrician</option>
  <option value="Psychiatrist">Psychiatrist</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Ophthalmologist">Ophthalmologist</option>
  <option value="Gastroenterologist">Gastroenterologist</option>
  <option value="Neurologist">Neurologist</option>
  <option value="Urologist">Urologist</option>
  <option value="Radiologist">Radiologist</option>
  <option value="Oncologist">Oncologist</option>
  <option value="Nephrologist">Nephrologist</option>
  <option value="Pulmonologist">Pulmonologist</option>
  <option value="Otolaryngologist">Otolaryngologist</option>
  <option value="Rheumatologist">Rheumatologist</option>
  <option value="Endocrinologist">Endocrinologist</option>
  <option value="Urogynecologist">Urogynecologist</option>
  <option value="Pain Management Specialist">Pain Management Specialist</option>
  <option value="Physiotherapist">Physiotherapist</option>
  <option value="Chiropractor">Chiropractor</option>
  <option value="Nurse Practitioner">Nurse Practitioner</option>
  <option value="Obstetrician Gynecologist">Obstetrician/Gynecologist (OBGYN)</option>
  <option value="ENT">ENT (Ear, Nose, and Throat Specialist)</option>
</select>

      <input
        className="EditDoctorInput"
        type="text"
        name="yearsExperience"
        placeholder="Years of Experience"
        value={editedData.yearsExperience}
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
        to={`/doctor/${id}/Myprofile`}
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

export default EditDoctor;
