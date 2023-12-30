import React, { useState } from 'react';
import '../css/LoginSignup.css';
import email_icon from '../components/Assets/email.png';
import user_icon from '../components/Assets/person.png';
import password_icon from '../components/Assets/password.png';
import { useNavigate } from 'react-router-dom';



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginSignup({setToken}) {

  const [action, setAction] = useState('Login');
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [gender, setGender] = useState('');
  const [Loginemail, setLoginEmail] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [password, setPassword] = useState('');
  const [Loginpassword, setLoginpassword] = useState('');
  const [phone, setphone] = useState('');
  const [yearsExperience, setExperience] = useState('');
  const [speciality, setSpeciality] = useState('');
  

  const navigate = useNavigate();


const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    // Collect all values
    const formData = {
      firstName,
      lastName,
      gender,
      email,
      clinicAddress,
      password,
      phone,
      yearsExperience,
      speciality,
    };
    console.log(formData)

    // Check if any required field is empty
    const requiredFields = ['firstName','lastName','gender', 'email', 'clinicAddress', 'password', 'phone', 'yearsExperience', 'speciality'];
    const isEmptyField = requiredFields.some(field => !formData[field]);
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (isEmptyField) {
      alert('Please fill in all required fields.');
    } else {
      const response = await fetch('http://localhost:8000/doctorCURD');
      const doctors = await response.json();

      const matchingDoctor = doctors.find((doctor) =>
        doctor.email && doctor.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (matchingDoctor && matchingDoctor.email === formData.email) {
        alert('Email used. Please try again.');
      } else {
        const newDoctorResponse = await sendDataToServer(formData);
        const newDoctorId = newDoctorResponse._id; // Assuming the server returns the doctor with the newly generated _id

        navigate(`/doctor/${newDoctorId}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately, such as displaying an error message to the user.
  }
};

const sendDataToServer = async (formData) => {
  try {
    const response = await fetch('http://localhost:8000/doctorCURD', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('Server response:', data);

    return data; // Return the newly created doctor data, including the _id
  } catch (error) {
    console.error('Error sending data to server:', error);
    // Handle the error appropriately, such as displaying an error message.
    throw error; // Rethrow the error to handle it in the calling function
  }
};

  
const handleLoginSubmit = async (e) => {
  e.preventDefault();

  // Collect email and password from the login form
  const email = Loginemail;
  const password = Loginpassword;

  try {
    // Fetch the doctor data from the server
    const response = await fetch('http://localhost:8000/doctorCURD');
    const doctors = await response.json();

    // Find the doctor with the entered email
    const matchingDoctor = doctors.find((doctor) =>
      doctor.email && doctor.email.toLowerCase() === email.toLowerCase()
    );
                                                          
    if (matchingDoctor) {
      // Email exists in the database, now check if the password matches
      if (matchingDoctor.password === password) {
        // Password matches, navigate to '/doctor'
        const doctorId = matchingDoctor._id;
        navigate(`/doctor/${doctorId}`);
      } else {
        // Password does not match, handle the situation as needed
        alert('Invalid password. Please try again.');
      }
    } else {
      // Email not found in the database, handle the situation as needed
      alert('Email not found. Please sign up.');
    }
  } catch (error) {
    console.error('Error fetching data from the server:', error);
    // Handle the error appropriately, such as displaying an error message.
  }
};


  

  return (
    
        <div className="login-container">
          <div className="action_header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="submit-container">
            <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign up")}>Sign up</div>
            <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
          </div>
          <form onSubmit={handleFormSubmit}>
          <div className="inputs">
              {action === "Login" ? <div></div> :
                <div className='input' key="name-input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="lastName-input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              }
              {action === 'Login' ? <div></div> : 
            <div className="input" key="gender-input">
            <label>Gender:</label>
            <select
              placeholder='Select Gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">None</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          }
              {action === "Login" ? <div></div> :
                <div className='input' key="ClinicAddress-input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="ClinicAddress"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                  />
                </div>
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="phone-input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="speciality-input">
                  <img src={user_icon} alt="" />
                  <label>Speciality:</label>
                  <select 
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}>
                    <option value="">None</option>
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
                  {/* <input
                    type="text"
                    placeholder="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  /> */}
                </div>
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="yearsExperience-input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="yearsExperience"
                    value={yearsExperience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="email-input">
                <img src={email_icon} alt="" />
                <input
                  type="email"
                  placeholder='Email Id'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
                
              }
              {action === "Login" ? <div></div> :
                <div className='input' key="password-input">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> 
              }
              {action === "Login" ? <div></div> :
              <div className='newsubmit'>
              <button type="Submit" className='btn btn-danger'>Sign Up</button>
            </div>}

          </div>
          </form>
          <form onSubmit={handleLoginSubmit}>
          {action === "Sign up" ? <div></div> :
              <div className='input' key="Email-input">
                <img src={email_icon} alt="" />
                <input
                  type="email" // changed to email from Email 
                  placeholder='Email'
                  value={Loginemail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
}
              {action === "Sign up" ? <div></div> :
              <div className='input' key="password-input">
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder='Password'
                  value={Loginpassword}
                  onChange={(e) => setLoginpassword(e.target.value)}
                />
              </div>}

          {action === "Sign up" ? <div></div> :
            <div className='newsubmit'>
              <button type="Submit" className='btn btn-danger' >Login</button>
            </div>}
            </form>
        
        </div>
    
  );
}