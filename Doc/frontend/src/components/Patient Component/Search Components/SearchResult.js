import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../../css/SearchResult.css"; // Make sure to adjust the path based on your project structure
import { Box, Text, Center } from '@chakra-ui/react';


const SearchResult = ({ result }) => {
  let patId  = useParams();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    navigate(`/docSearchedPf/${result._id}/${patId.id}`);
  };

  return (
    // <div className='search-result-item' onClick={handleSearchSubmit}>
    //   <div className='result-name'>{result.firstName +" "+result.lastName}</div>
    //   <div className='result-speciality'>{result.speciality}</div>
    // </div> 


 <Box
  className='search-result-item'
  onClick={handleSearchSubmit}
  //p={2} // Adjust padding as needed
  borderWidth="0.5px"
  borderColor="gray.300"
  borderRadius="md"
  cursor="pointer"
>
  <Text className='result-name' fontSize="sm" mb={0.5}>{result.firstName + " " + result.lastName}</Text>
  <Text className='result-speciality' fontSize="xs" mb={0.5}>{result.speciality}</Text>
</Box> 
  );
};

export default SearchResult;
