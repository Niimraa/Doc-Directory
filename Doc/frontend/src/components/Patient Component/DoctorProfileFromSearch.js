import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreateDisplayReview } from '../Review/createDisplayReview'
import DateTimePicker from '../Appointment';
const DoctorProfileFromSearch = ({availableTimesByDate}) => {
  const { docId, patId } = useParams();
  console.log(docId)
  console.log(patId)

    
  function fetchData(id) {
    // This part is not necessary when using 'await'
    // fetch returns a promise, so you can just use 'await' directly
    fetch(`http://localhost:8000/doctorCURD/${docId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Log the data once
  
        // Handle the fetched data as needed
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error as needed
      });
    
    // This part also executes when the fetch operation completes
    console.log("Fetching completed"); // Log again
  }
  
  fetchData(docId)

  return (
    <>
      <div>

        <div>
          <DateTimePicker  availableTimesByDate={availableTimesByDate} doctorId={docId} patientId={patId}></DateTimePicker>
        </div>
      <div>
        <CreateDisplayReview patId={patId} docId={docId}></CreateDisplayReview>
      </div>

      
      </div>
      {/* Other JSX elements */}
    </>
  );
};

export default DoctorProfileFromSearch;
