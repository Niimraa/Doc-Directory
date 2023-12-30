// SearchBar.js
import '../../../css/SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { Flex, Input, Icon, Box } from '@chakra-ui/react';




export const Search = ({ setResults }) => {
  const [input, setInput] = useState('');

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData(input);
  }, [input]);

  const fetchData = (value) => {
    // Fetch data from the server
    fetch('http://localhost:8000/doctorCURD')
      .then((response) => response.json())
      .then((json) => {
        const matchingDoctors = json.filter((doctor) => {
          // search with both first and last name 
          return (
            value &&
            doctor &&
            ((doctor.firstName && doctor.firstName.toLowerCase().startsWith(value.toLowerCase())) ||
            (doctor.lastName && doctor.lastName.toLowerCase().startsWith(value.toLowerCase())))
          );
        });
  
        const results = matchingDoctors;
        setResults(results);
      });
  };
  

  const handleChange = (value) => {
    setInput(value);
    // fetchData(value);
  };

  return (
    // <div className='input-wrapper'>
      
    //   <FaSearch id='search-icon'></FaSearch>
    //   <input
    //     type='text'
    //     placeholder='Search by name...'
    //     value={input}
    //     onChange={(e) => handleChange(e.target.value)}
    //   />
     
    // </div>
// {/* <Flex align="center" justify="center" height="10vh">  */}
  <Flex
    //padding="0px 200px" 
    className='input-wrapper'
    alignItems="center"
    borderWidth="1px"
    borderRadius="md"
    //p={2}
    boxShadow="md"
  >
    <Icon as={FaSearch} id='search-icon' />
    <Input
      //padding="0px 200px" 
      type='text'
      placeholder='Search by name...'
      value={input}
      onChange={(e) => handleChange(e.target.value)}
    />
  </Flex>
// </Flex>


    
  );
};

export default Search;
