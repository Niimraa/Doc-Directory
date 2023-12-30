
import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector";
import { useParams } from 'react-router-dom';

import DateTimePicker from "./Appointment"; // Import the DateTimePicker component
import '../css/ApptAvailability.css';




// function formatDateTime(originalDateTime) {
//     // Parse the original date and time
//     const parsedDate = new Date(originalDateTime);
//     // Format the date as 'YYYY-MM-DD'
//     const formattedDate = parsedDate.toISOString().split('T')[0];
//     // Format the time as 'h:mm AM/PM'
//     const hours = parsedDate.getHours();
//     const minutes = parsedDate.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedTime = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
//     return { formattedDate, formattedTime };
//  }


function formatDateTime(originalDateTime) {
  // Parse the original date and time
  const parsedDate = new Date(originalDateTime);
  // Format the date as 'YYYY-MM-DD'
  const formattedDate = parsedDate.toISOString().split('T')[0];
  // Format the time as 'hh:mm AM/PM' to ensure proper ordering
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Ensure 2-digit hours
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure 2-digit minutes
  const formattedTime = formattedHours + ':' + formattedMinutes + ' ' + ampm;
  return { formattedDate, formattedTime };
}
  


export const ApptAv = ({onsave}) => {
  const { doctorId } = useParams();

    // Create an object to store grouped times by date
    const groupedTimesByDate = {};
    //var initialSchedule = [];

    //localStorage.clear("savedSchedule"); //clear the local storage (for testing purposes)
     //const initialSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];
     ////////////////////////////////////////////////////////////////



     const [schedule, setSchedule] = useState([]);
   const [initialSchedule, setInitialSchedule] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true to indicate loading

  useEffect(() => {
    const fetchData = async () => {
      const fetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const url = `http://localhost:8000/availabilityCURD/${doctorId}`;
  
      try {
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
          const result = await response.json();
          console.log(result);
  
          // Sort the schedule
          const sortedSchedule = [...result];
          sortedSchedule.sort((a, b) => {
            const getMeridian = (time) => time.split(' ')[1];
            const getTime = (time) => time.split(' ')[0];
            if (getMeridian(a) === 'AM' && getMeridian(b) === 'PM') {
              return -1;
            } else if (getMeridian(a) === 'PM' && getMeridian(b) === 'AM') {
              return 1;
            } else {
              return getTime(a).localeCompare(getTime(b));
            }
          });
  
          setSchedule(sortedSchedule);
          setLoading(false);
        } else {
          console.error('Failed to fetch data.');
          setLoading(false); // Ensure loading is set to false on error
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };
  
    fetchData();


    // Save the schedule to local storage whenever it changes
  // if (schedule.length > 0) {
  //   localStorage.clear("savedSchedule");
  //   localStorage.setItem("savedSchedule", JSON.stringify(schedule));
  // }


    //handleSaveSchedule();
  }, [doctorId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSaveSchedule = () => {
    // ... (Your existing code for saving the schedule to local storage)
    //console.log(JSON.stringify(schedule));

    // store schedule in the database
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: doctorId,
        availableDates: JSON.parse(JSON.stringify(schedule)),
      }),
    };

    const url = `http://localhost:8000/availabilityCURD/update/${doctorId}`;
   fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);

        result = result.availableDates;

        result.forEach((element) =>{
          const { formattedDate, formattedTime } = formatDateTime(element);
    
            if (!groupedTimesByDate[formattedDate]) {
              groupedTimesByDate[formattedDate] = [];
            }
    
            groupedTimesByDate[formattedDate].push(formattedTime);
        })
        console.log(groupedTimesByDate);
            onsave(groupedTimesByDate);

    

      });

    alert("Schedule has been saved!");


    










    // Print out all scheduled dates if we have any
    // if (localStorage.length > 0) {
    //   console.log(localStorage.getItem("savedSchedule"));

    //   JSON.parse(localStorage.getItem("savedSchedule")).forEach((element) => {
    //     const { formattedDate, formattedTime } = formatDateTime(element);

    //     if (!groupedTimesByDate[formattedDate]) {
    //       groupedTimesByDate[formattedDate] = [];
    //     }

    //     groupedTimesByDate[formattedDate].push(formattedTime);
    //   });
    // }

    // console.log(groupedTimesByDate);
    // //onsave(groupedTimesByDate);
  };












  //    // get schedule in database
  //    const fetchData = async () => {

  //    const fetchOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   }
  //   const url = "http://localhost:8000/availabilityCURD/${doctorId}"
  //   const initialSchedule = await fetch(url,fetchOptions)
  //   .then((response)=>{
  //       return response.json();
  //   })
  //   .then((result)=>{
  //       console.log(result);

  //   })  
  // }


  //   //const initialSchedule = result;      
        
  //   // Custom sorting function
  // initialSchedule.sort((a, b) => {
  //   const getMeridian = (time) => time.split(' ')[1]; // Extract AM or PM
  //   const getTime = (time) => time.split(' ')[0]; // Extract time without AM/PM

  //   if (getMeridian(a) === 'AM' && getMeridian(b) === 'PM') {
  //     return -1; // AM comes before PM
  //   } else if (getMeridian(a) === 'PM' && getMeridian(b) === 'AM') {
  //     return 1; // PM comes after AM
  //   } else {
  //     // If both are AM or both are PM, compare their times
  //     return getTime(a).localeCompare(getTime(b));
  //   }
  // });


  //     const [schedule, setSchedule] = useState(initialSchedule);    

    //////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
      

////////////////////////////////////////////////////////////


    // useEffect(() => { // Save the schedule to local storage whenever it changes
      
    //   localStorage.clear("savedSchedule");
    //     localStorage.setItem("savedSchedule", JSON.stringify(schedule));
    // }, [schedule]);

//     const handleSaveSchedule = () => { // Save the schedule to local storage
//       localStorage.clear("savedSchedule");
//       localStorage.setItem("savedSchedule", JSON.stringify(schedule));

//       //////////////////////////////////////////////////////////////

//             // store schedule in database
//             const fetchOptions = {
//               method: 'POST',headers: {'Content-Type': 'application/json', },
//               body: JSON.stringify({
//                 // Request body data, typically an object to be sent as JSON
//                 doctorId: doctorId,
//                 availableDates: JSON.parse(JSON.stringify(schedule))
//               }),
//             }
        
//             const url = "http://localhost:8000/availabilityCURD/doctorId"
//             fetch(url,fetchOptions)
//             .then((response)=>{
//                 return response.json();
//             })
//             .then((result)=>{
//                 console.log(result);
//             })
    

// //////////////////////////////////////////////////////////////////////////



//       alert("Schedule has been saved!");


//         // Print out all scheduled dates if we have any
//         if (localStorage.length > 0 ){

//         console.log(localStorage.getItem("savedSchedule"));

//         JSON.parse(localStorage.getItem("savedSchedule")).forEach(element => {
//           const {formattedDate, formattedTime } = formatDateTime(element);

//             if (!groupedTimesByDate[formattedDate]) {
//               groupedTimesByDate[formattedDate] = [];
//             }
        
//             groupedTimesByDate[formattedDate].push(formattedTime);
        
//         });
//       }
    

//       console.log(groupedTimesByDate);
//       onsave(groupedTimesByDate);
//       };
  
  return (
    <div className = "schedulerContainer" >
      <ScheduleSelector
        selection={schedule}
        onChange={setSchedule}
        timeFormat="h:mma"
        dateFormat="ddd, MMM DD"
        numDays={14}
        hourlyChunks={2}
        minTime={9}
        maxTime={17}  
        
      />
      <button onClick={handleSaveSchedule}>Save Schedule</button>
    </div>
  );
};




export default ApptAv;