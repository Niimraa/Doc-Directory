import {useNavigate, useParams} from "react-router-dom"
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Patient Component/Search Components/SearchBar'
import SearchResults from '../components/Patient Component/Search Components/SearchResults'
import SearchFilterComponent from "../components/Patient Component/Search Components/SearchFilterComponent";
import { Button } from '@chakra-ui/react';



const Patient = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const patId  = useParams();

    
    const [doctorData, setDoctorData] = useState(null);
    const [results, setResults] = useState([])
    const [searchClicked, setSearchClicked] = useState(false); // set if the search was clicked in SerchComponene 

    const [filteredResults, setFilteredResults] = useState([])
    useEffect(() => {
      // When searchClicked becomes true and filteredResults are available, log the data.
      if (searchClicked && filteredResults.length > 0) {
        // You can do further processing or rendering with the filteredResults here.
      }
    }, [searchClicked, filteredResults]);
    return (
      <div className="search-page">
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
          </div>
          <div className="search-results-container">
            <SearchResults results={results}/>
          </div>
          <div className='search-filter-container'>                              
          <SearchFilterComponent patId={patId}/>
          </div>
    
          <Button 
          colorScheme="teal" 
          style={{ maxHeight: '40px' }} 
          position="absolute"
          top="20px"
          right="20px"
          //maxHeight="40px"
          onClick={() => navigate(`/patient/${id}/Myprofile`)}>My Profile</Button>

 
        </div>

    );
}

export default Patient;
