import React,{ useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
// import '../css/displayAppointments.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { DatePicker } from "@mui/x-date-pickers";





const convertDateFormat = (inputDate) => {
  // Parse the input date string
  const tempDate = new Date(inputDate);

  // Format the date to the desired format (e.g., "2023-11-01T18:00:00.000Z")
  const newDate = tempDate.toISOString();
  return newDate;
};

export function  ShowPatientAppt () {
  // const  ShowPatientAppt = () => {

    const {patientId} = useParams();
    const [loading, setLoading] = useState(true); // Initialize as true to indicate loading
    const [arr, setarr] = useState([]);


      const fetchData = async () => {
        const fetchOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const url = `http://localhost:8000/apptCURD/${patientId}`;
    
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
            const result = await response.json();
            addNameToArrWithFetch(result).then((newArray) => {
              setarr(newArray);
            });
  
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

      useEffect(() => {
        fetchData();
      }, [patientId]);
    
    
        if (loading){
          return 
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              height: "100vh", 
            }}>Loading the data {console.log("loading state")}</div>  
        }

        const cancelData = async (apptId) => {
          const cancelOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          };
          const url = `http://localhost:8000/apptCURD/cancel/${apptId}`;
          try {
            const response = await fetch(url, cancelOptions);
            if (response.ok) {
              const result = await response.json();
              console.log(result);
                fetchData();


                var concatenatedDataandTime = result.date + " " + result.startTime;

            if (result.isCancelled == true){
              //  remove the appt from the bookedDates in the availability object

              const fetchOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  doctorId: result.doctorId,
                  bookedDateToRemove: convertDateFormat(concatenatedDataandTime)
                }),
              };
          
              const url = `http://localhost:8000/availabilityCURD/removedate/${doctorId}`;
             fetch(url, fetchOptions)
                .then((response) => {
                  return response.json();
                })
                .then((result) => {          
                })
            }


            if (result.isCancelled == false){
              //and if it is uncancelled add it back to the availability object

              const fetchOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  doctorId: result.doctorId,
                  bookedDates: convertDateFormat(concatenatedDataandTime)
                }),
              };
          
              var doctorId = result.doctorId;
              const url = `http://localhost:8000/availabilityCURD/update/${doctorId}`;
             fetch(url, fetchOptions)
                .then((response) => {
                  return response.json();
                })
                .then((result) => { 
            })
          }

    
            } else {
              console.error('Failed to fetch data.');
            }
          } catch (error) {
            console.error('Error during fetch:', error);
          }
  
        }

      
  
      // const getDocName = async (id) => {
      //   // get and return the doc name associated with this docID
      //   const fetchOptions = {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json', // Request headers
      //     },
      //   };
      //   const url = `http://localhost:8000/doctorCURD/${id}`
      //   const response = await fetch(url, fetchOptions);
      //   if (response.ok) {
      //     const result = await response.json();
      //     console.log(result.doctor.firstName);
      //   }else {
      //     console.error('Failed to fetch data.');
      //   }
      // }

      async function addNameToArrWithFetch(array) {
        const updatedArray = [];
    
        for (const item of array) {
          const id = item.doctorId;
          const fetchOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const url = `http://localhost:8000/doctorCURD/${id}`;
      
          try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
              const result = await response.json();
              const updatedItem = { ...item, firstName: result.doctor.firstName };
              updatedArray.push(updatedItem);
            } else {
              console.error('Failed to fetch data for id:', id);
            }
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        }
        return updatedArray;
      }


return (
  <>
  <td> <Link to={`/patient/${patientId}`} className="btn btn btn-dark">Book Again</Link> </td>

  {/* <div className="w-100 vh-100 d-flex justify-content-center align-items-center"> */}

  <table className="table">
    <thead>
      <tr>
        <th>Doctor Name</th>
        <th>Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Is Cancelled</th>
        {/* <th></th> */}
        <th></th>

      </tr>
    </thead>
    <tbody>
      {/* {arr.map((item, index) => ( */}
      {arr.slice().reverse().map((item, index) => (
        <tr key={index}>
          <td>{item.firstName}</td>
          <td>{item.date}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{(item.isCancelled).toString()}</td>
           <td>
            <Link
              to=""
              className={item.isCancelled ? "btn btn-danger" : "btn btn-success mx-2"}
              onClick={() => cancelData(item._id)}
            >
              {item.isCancelled ? "UnCancel" : "Cancel"}
            </Link>
          </td>


        </tr>
      ))}
    </tbody>
  </table>

{/* </div> */}
</>


)
}
                
                    
export default ShowPatientAppt;