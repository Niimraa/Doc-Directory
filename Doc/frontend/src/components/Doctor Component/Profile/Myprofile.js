import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../../css/Myprofile.css';

function Myprofile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await fetch(`http://localhost:8000/DoctorCURD/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          navigate(`/`);
        } else {
          console.error('Error deleting profile');
          
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        
      }
    }
  };

  return (
    <div className="my-profile-container">
      <div className="main-content">
        {doctorData ? (
          <div>
             <h1>Doctor Profile</h1>
             <div className="profile-info">
            {doctorData.doctor && (
              <div>
                <p>First Name: {doctorData.doctor.firstName}</p>
                <p>Last Name: {doctorData.doctor.lastName}</p>
                <p>Email: {doctorData.doctor.email}</p>
                <p>Gender: {doctorData.doctor.gender}</p>
                <p>Password: {doctorData.doctor.password}</p>
                <p>Clinic Address: {doctorData.doctor.clinicAddress}</p>
                <p>Phone: {doctorData.doctor.phone}</p>
                <p>Speciality: {doctorData.doctor.speciality}</p>
                <p>Years of Experience: {doctorData.doctor.yearsExperience}</p>
                {/* {isEditing ? (
                  <Link to={`/doctor/${id}/edit`}>Edit</Link>
                ) : (
                  setIsEditing(true)
                )} */}
                {isEditing ? (
                <Link
                  to={`/doctor/${id}/edit`}
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    backgroundColor: 'black',
                    padding: '10px 10px',
                    margin: '10px 5px',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  Edit
                </Link>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    backgroundColor: 'black',
                    padding: '10px 10px',
                    margin: '10px 5px',
                    borderRadius: '5px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer', // Adding cursor pointer for button
                  }}
                >
                  Edit
                </button>
              )}

                  {/* <button onClick={handleDelete}>Delete Profile</button> */}
                          <button
          onClick={handleDelete}
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            backgroundColor: 'black',
            padding: '10px 10px',
            margin: '10px 5px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Delete Profile
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

  );
}

export default Myprofile;