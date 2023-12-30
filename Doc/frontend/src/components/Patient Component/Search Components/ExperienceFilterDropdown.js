import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import { Select } from '@chakra-ui/react';


function ExperienceFilterDropdown({ selectedSpeciality, onExperienceChange }) {
  const [values, setValues] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    // Fetch doctors' experience data from your API
    fetch(`http://localhost:8000/doctorCURD?speciality=${selectedSpeciality}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const experience = data.map((doctor) => doctor.yearsExperience);
        // Calculate experience ranges based on the actual experience values
        const ranges = calculateExperienceRanges(experience);
        setValues(['None', ...ranges]); // Include a "None" option
      })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [selectedSpeciality]);

  const calculateExperienceRanges = (experienceData) => {
    const rangeOptions = [
        [0, 5],
        [6, 10],
        [11, 15],
        [16, 20],
        [21, 25],
        [26, 30],
        [31, 35],
        [36, 40],
        [41, 45],
        [46, 50],
        [51, 55],
        [56, 60] // at max 60 years of experience 

    ]
  
  
    const ranges = [];
  
    for (let i = 0; i < rangeOptions.length; i++) {
      const [min, max] = rangeOptions[i];
      
      // Check if any experience in the experienceData falls within the range
      const hasExperienceInRange = experienceData.some((experience) => experience >= min && experience <= max);
  
      if (hasExperienceInRange) {
        ranges.push(`${min} - ${max} years`);
      }
    }
  
    return ranges;
  };
  

  const handleChange = (selectedOption) => {
    setSelectedExperience(selectedOption);
    onExperienceChange(selectedOption.value);
  };

  return (
    <div>
      <Select
        placeholder='Experience'
        options={values.map((value) => ({ value, label: value }))}
        onChange={handleChange}
        value={selectedExperience}
      />
    </div>

    // <Select
    // placeholder="Experience"
    // padding="4px 0px" 
// 
  // >
  //   {values.map((value) => (
  //     <option key={value} value={value}>
  //       {value}
  //     </option>
  //   ))}
  //   onChange={(e) => handleChange(e.target.value)}
  //   value={selectedExperience}
  // </Select>

  );
}

export default ExperienceFilterDropdown;
