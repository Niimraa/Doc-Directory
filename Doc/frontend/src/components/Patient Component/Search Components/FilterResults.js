import React from 'react'
import FilterResultItem from './FilterResultItem'
import '../../../css/FilterResults.css'
import { Box, Text, Stack, Center, Grid } from '@chakra-ui/react';



function FilterResults({filteredDoctors, patId}) {

  return (

      // <div className="filterResults-parent">
      //   Search Results
      //   <div className='filter-results-list'>
      //           {filteredDoctors.map((doctor)=>(
      //             <FilterResultItem key={doctor._id} doctorPassed={doctor} patId={patId}/>
      //           ))}
      //   </div>
      // </div>


//       <Box className="filterResults-parent">
//   <Text fontSize="md">Search Results</Text>
//   <Box className='filter-results-list'>
//     {filteredDoctors.map((doctor) => (
//       <FilterResultItem key={doctor._id} doctorPassed={doctor} patId={patId} />
//     ))}
//   </Box>
// </Box>


<Grid templateColumns="repeat(2, 1fr)" gap={4}>
  <Box className="filterResults-parent" gridColumn="span 1" >
    <Text fontSize="md">Search Results</Text>
  </Box>
  <Box className='filter-results-list' gridColumn="span 1">
    {filteredDoctors.map((doctor) => (
      <FilterResultItem key={doctor._id} doctorPassed={doctor} patId={patId} />
    ))}
  </Box>
</Grid>

  );
}

export default FilterResults
