
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Appointment.css';
import { Heading } from "@chakra-ui/react";






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

function addMinutesToTime(timeString, minutesToAdd) {
  let [time, meridian] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert to 24-hour format
  if (meridian === 'PM' && hours < 12) {
    hours += 12;
  } else if (meridian === 'AM' && hours === 12) {
    hours = 0;
  }
  // Add the minutes
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  hours = Math.floor(totalMinutes / 60);
  minutes = totalMinutes % 60;

  // Convert back to 12-hour format
  meridian = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Format the new time
  const newTime = `${hours}:${minutes.toString().padStart(2, '0')} ${meridian}`;
  return newTime;
}

const convertDateFormat = (inputDate) => {
  // Parse the input date string
  const tempDate = new Date(inputDate);

  // Format the date to the desired format (e.g., "2023-11-01T18:00:00.000Z")
  const newDate = tempDate.toISOString();
  return newDate;
};

export const DateTimePicker = ({availableTimesByDate, doctorId, patientId}) => {
  // const { patientId, doctorId } = useParams();
  
  const [selectedDateTime, setSelectedDateTime] = useState('');
  
  const [selectedDate, setSelectedDate] = useState(selectedDateTime || setHours(setMinutes(new Date(), 30), 16));
  const [selectedTime, setSelectedTime] = useState('');

  const [loading, setLoading] = useState(true); // Initialize as true to indicate loading
  const [bookedDatesList, setbookedDatesList] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const fetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const url = `http://localhost:8000/availabilityCURD/availability/${doctorId}`;
  
      try {
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
          var result = await response.json();
          //console.log(result);
          setbookedDatesList(result.bookedDates);

          var tempResult = result.availableDates;

          //console.log(result);
          if (tempResult && (result.bookedDates)) {
            if (!(tempResult.length === 0) && !((result.bookedDates).length === 0)) {
              tempResult = tempResult.filter(time => !(result.bookedDates).includes(time));
            }
          }

          result = tempResult;
        
          if (result != undefined){
          result.forEach((element) =>{
            const { formattedDate, formattedTime } = formatDateTime(element);
              if (!availableTimesByDate[formattedDate]) {
                availableTimesByDate[formattedDate] = [];
              }
              availableTimesByDate[formattedDate].push(formattedTime);
          }) 
        }
          
          setSelectedDateTime()
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

  }, [doctorId]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reset the selected time when the date changes
        
    };

    // Format Date
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate); // Output: '2023-10-20'

    var availableTimes = availableTimesByDate[formattedDate] || [];

    async function handleBooking () {
      if (selectedTime == "" && document.getElementById("concern").value == ""){
       alert("Error: Pick a time and enter your conern")
      }else if (selectedTime == "" ){
          alert("Error: Pick a time")
      }else if (document.getElementById("concern").value == ""){
          alert("Error: Enter your concern")
      }else{

      
      alert("Appointment on " + selectedDate.toDateString() + " at " + selectedTime + " has been booked");
      setSelectedTime(''); // Reset the selected time when the date changes

      var concern_input = document.getElementById("concern").value;

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Request headers
        },
        body: JSON.stringify({
          // Request body data, typically an object to be sent as JSON
          doctorId: doctorId,
          patientId: patientId,
          date: selectedDate.toDateString(),
          startTime: selectedTime,
          endTime: addMinutesToTime(selectedTime, 30) ,
          concern: concern_input,
          isCancelled: false,
          notes: "",
        }),
      };
      const url = "http://localhost:8000/apptCURD/patientId/doctorId"
      fetch(url,fetchOptions)
      .then((response)=>{
          return response.json();
      })
      .then((result)=>{
          //console.log(result);
      })


      //Link to appt display page
      window.location.href = `/patient/${patientId}/Appointments`;
    };

    const concatenatedDataandTime = selectedDate.toDateString() + " " + selectedTime;

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: doctorId,
        bookedDates: convertDateFormat(concatenatedDataandTime)
      }),
    };

    const url = `http://localhost:8000/availabilityCURD/update/${doctorId}`;
   fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {

        //console.log(bookedDatesList)

      });
  

  }


    const disabledDates = [
      // new Date('2023/10/25'),
      // new Date('2023/10/28'),
      // new Date('2023/11/02'),
    ];

  return (
    <div className="datetime-picker-container">
      <Heading size="md">Book Your Appointment</Heading>

      <div className="date-picker">
        <DatePicker
          // excludeDates={disabledDates}
          selected={selectedDate}
          onChange={handleDateChange} 
          dateFormat="MMMM d, yyyy"
          minDate={new Date()} // Set the minimum date to yesterday
        />
      </div>

      <div className="time-selector">
        <select
          value={selectedTime}
          onChange={ 
            (event) => setSelectedTime(event.target.value)
          }
        >
          <option value="">Select a time</option>
          {[... new Set (availableTimes)].map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <p> Reason for Appointment? </p>
    <div className='text'>
    <form><textarea id='concern'></textarea></form>
      </div>
      
      <p><button onClick={handleBooking}>Book Now </button> </p>
    </div>
  );
};


export default DateTimePicker;
