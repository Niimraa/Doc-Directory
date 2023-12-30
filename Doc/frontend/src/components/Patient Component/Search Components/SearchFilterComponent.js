import React, { useState } from 'react';
import SpecialityDropdown from './SpecialityDropdown';
import ExperienceFilterDropdown from './ExperienceFilterDropdown';
import SearchFilter from '../../../css/SearchFilter.css';
import FilterResults from './FilterResults';
import GenderFilterDropdown from './genderFilterDropdown.js';
import { Box, Button, Text } from '@chakra-ui/react';




/*

SearchFilterComp passes results --> Patient --> App --> FilterResults (show results) 

*/

function SearchFilterComponent({patId}) {
  const [selectedSpeciality, setSelectedSpeciality] = useState('None');
  const [selectedExperience, setSelectedExperience] = useState('None');
  const [selectedGender, setSelectedGender] = useState('None');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSearch = () => {
    setIsLoading(true);
    console.log("Selected Gender = "+selectedGender)
    fetch(`http://localhost:8000/doctorCURD?speciality=${selectedSpeciality}&experience=${selectedExperience}&gender=${selectedGender}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredDoctors(data);
        setIsLoading(false);
        
       
        
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
        setIsLoading(false);
      });
  };

  return (
    // <div className="search-filter-component">
    //   <SpecialityDropdown onSpecialityChange={setSelectedSpeciality}/>
    //   <ExperienceFilterDropdown
    //     selectedSpeciality={selectedSpeciality}
    //     onExperienceChange={setSelectedExperience}
        
    //   />
    //   <GenderFilterDropdown onGenderChange={setSelectedGender}></GenderFilterDropdown>
    //   <button variant='dark' onClick={handleSearch}>Search</button>

    //   {isLoading && <p>Loading...</p>}

    //   {filteredDoctors.length > 0 && (
    //       <FilterResults filteredDoctors={filteredDoctors} patId={patId}/> 
    //   )}
      
    // </div>


    <Box className="search-filter-component">
  <SpecialityDropdown onSpecialityChange={setSelectedSpeciality} />

  <ExperienceFilterDropdown
    selectedSpeciality={selectedSpeciality}
    onExperienceChange={setSelectedExperience}
  />

  <GenderFilterDropdown onGenderChange={setSelectedGender} />

  <Box p={{ base: '10px'}} /> 

  <Button colorScheme="teal" onClick={handleSearch}>
    Search
  </Button>

  {isLoading && <Text>Loading...</Text>}

  <Box p={{ base: '15px'}} /> 

  {filteredDoctors.length > 0 && (
    <FilterResults filteredDoctors={filteredDoctors} patId={patId} />
  )}
</Box>
  );
}

export default SearchFilterComponent;
