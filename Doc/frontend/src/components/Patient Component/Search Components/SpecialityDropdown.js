import React, { useEffect, useState } from 'react';
import Select from 'react-select';
// import { Select } from '@chakra-ui/react';


function SpecialityDropdown({onSpecialityChange}) {
  // use state to show all the values 
  const [values, setValues] = useState([]);
  // use state to see what values are selected
  const [selectedValue, setSelectedValue] = useState('None');

  const [doctors, setDoctors] = useState([]) // for filtering speciality 



  useEffect(() => {
    fetch('http://localhost:8000/doctorCURD')
      .then((response) => response.json())
      .then((data) => {
        // convert to Set to get rid of duplicate specialities and then convert back to Array 
        const specialities = Array.from(new Set(data.map((doctor) => doctor.speciality)));
        setValues(['None',...specialities]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
// the param here if provided by the onclick property 
  const handleChange = (selectedOption) => {
    // selectedOption is an object with properties 'value' and 'label'
    console.log('Selected Value:', selectedOption.value);
    setSelectedValue(selectedOption);
    onSpecialityChange(selectedOption.value);

    
    
    
    
    fetch(`http://localhost:8000/doctorCURD?speciality=${selectedOption.value}`)
    .then((response) => response.json())
    .then((data) => {
      setDoctors(data);
    })
    .catch((error) => {
        console.error('Error fetching doctors:', error);
      });

      // as soon as speciaity changes, reset the filter 
    // resetExperience();

  };

  return (
    <div>
    <Select
      placeholder='Speciality'
      options={values.map((value) => ({ value, label: value }))}
      onChange={handleChange}
      
      value={selectedValue}
      
    />
  </div>

      // <Select
      // placeholder="Speciality"
      // padding="4px 0px" 
      // >
      // {values.map((value) => (
      //   <option key={value} value={value}>
      //     {value}
      //   </option>
      // ))}
      //       onChange={(e) => handleChange(e.target.value)}
      //       value={selectedValue}

      // </Select>


  )
}

export default SpecialityDropdown;
