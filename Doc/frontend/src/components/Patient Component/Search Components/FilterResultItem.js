import React from 'react';
import '../../../css/FilterResultItem.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';



function FilterResultItem({doctorPassed, patId}) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Define the URL you want to navigate to
    const doctorProfileUrl = `/docSearchedPf/${doctorPassed._id}/${patId.id}`; 

    // Use the navigate function to go to the specified URL
    navigate(doctorProfileUrl);
  }
  return (
    // {/* <div className='filter-result-item' onClick={handleClick}>
    //   <div className='filter-result-name'>{doctorPassed.firstName +" "+doctorPassed.lastName}</div>
    //   <div className='filter-result-speciality'>{doctorPassed.speciality}</div>
    //   <div className='filter-result-experience'>
    //   Experience: {doctorPassed.yearsExperience} years
    //   </div>
    // </div> */}


    <Box
    className='filter-result-item'
    onClick={handleClick}
    borderWidth='1px'
    borderColor='gray.300'
    borderRadius='sm'
    padding={2}
    cursor='pointer'
  >
    <Text className='filter-result-name' fontSize="sm" mb={1}>
      {doctorPassed.firstName + ' ' + doctorPassed.lastName}
    </Text>
    <Text className='filter-result-speciality' fontSize="xs" mb={0.5}>{doctorPassed.speciality}</Text>
    <Text className='filter-result-experience' fontSize="xs" mb={0.5}>
      Experience: {doctorPassed.yearsExperience} years
    </Text>
  </Box>
    
    

  )
}


export default FilterResultItem;
