import React from 'react';
import Select from 'react-select';
// import { Select } from '@chakra-ui/react';


const GenderFilterDropdown = ({ onGenderChange }) => {
  const options = [
    { label: 'None', value: 'None' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    
  ];

  return (
    <div>
      <Select
        placeholder="Gender"
        options={options}
        onChange={(selectedOption) => {
          onGenderChange(selectedOption.value); // Pass the selected value to the parent component
        }}
      />
    </div>

  //   <Select
  //   placeholder="Gender"
  //   padding="4px 0px" 

  // >
  //   {options.map((option) => (
  //     <option key={option.value} value={option.value}>
  //       {option.label}
  //     </option>
      
  //   ))}
  //       onChange={(e) => onGenderChange(e.target.value)}

  // </Select>


  );
}

export default GenderFilterDropdown;
