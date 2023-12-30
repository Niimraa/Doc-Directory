import React,{ useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
// import '../css/displayAppointments.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react'



const convertDateFormat = (inputDate) => {
  // Parse the input date string
  const tempDate = new Date(inputDate);

  // Format the date to the desired format (e.g., "2023-11-01T18:00:00.000Z")
  const newDate = tempDate.toISOString();
  return newDate;
};

const ShowDocAppt = () => {
    const {doctorId} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize as true to indicate loading
    const [arr, setarr] = useState([]);

    //const { isOpen, onOpen, onClose } = useDisclosure()

    const {
      isOpen: isNotesModalOpen,
      onOpen: onNotesModalOpen,
      onClose: onNotesModalClose,
    } = useDisclosure();
    const {
      isOpen: isMedicalHistoryModalOpen,
      onOpen: onMedicalHistoryModalOpen,
      onClose: onMedicalHistoryModalClose,
    } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [notesValue, setnotesValue] = useState("");
    const [currApptId, setcurApptId] = useState("");

    const [medicalHistory, setMedicalHistory] = useState('');



    const fetchData = async () => {
      const fetchOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const url = `http://localhost:8000/apptCURD/doc/${doctorId}`;
    
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
            const result = await response.json();
            //console.log(result);
            setData(result);
            addNameToArrWithFetch(result).then((newArray) => {
              setarr(newArray);
            });
            //setarr(result)
  
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
      }, [doctorId]);



      const cancelData = async (apptId) => {
        //setLoading(true);
        //console.log(apptId);
        const cancelOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const url = `http://localhost:8000/apptCURD/cancel/${apptId}`;
    
        try {
          const response = await fetch(url, cancelOptions);
          if (response.ok) {
            const result = await response.json();
            //console.log(result);
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

        const openMedicalHistoryModal = (medicalHistoryText) => {
          setMedicalHistory(medicalHistoryText);
          onMedicalHistoryModalOpen();

        };

        const openNotesModalForItem = (item) => {
          setcurApptId(item);

          // save the value in the notes field of the appointment document
          const fetchOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Request headers
            },
          };
          const url = `http://localhost:8000/apptCURD/getnotes/${item}`
          fetch(url,fetchOptions)
          .then((response)=>{
              return response.json();
          })
          .then((result)=>{
              setnotesValue(result);
          })


          onNotesModalOpen();

        };


        const handleSaveClick = () => {
            // save the value in the notes field of the appointment document
            const fetchOptions = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json', // Request headers
              },
            };
            const url = `http://localhost:8000/apptCURD/notes/${currApptId}/${notesValue}`
            fetch(url,fetchOptions)
            .then((response)=>{
                return response.json();

            })
            .then((result)=>{
            })

            //onClose();
            onNotesModalClose();
        };

        async function addNameToArrWithFetch(array) {
          const updatedArray = [];
      
          for (const item of array) {
            const id = item.patientId;
            const fetchOptions = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const url = `http://localhost:8000/patientCURD/${id}`;
        
            try {
              const response = await fetch(url, fetchOptions);
              if (response.ok) {
                const result = await response.json();

                const updatedItem = { ...item, firstName: result.patients.firstName, 
                medicalHistory: result.patients ? result.patients.medicalHistory : '', // Add medical history if available
                };
                updatedArray.push(updatedItem);
              } else {
                console.error('Failed to fetch data for id:', id);
              }
            } catch (error) {
              console.error('Error during fetch:', error);
            }
          }
          console.log(updatedArray);
          return updatedArray;
        }




return (
  <>
  {/* <div className="w-100 vh-100 d-flex justify-content-center align-items-center"> */}
  <table className="table">
    <thead>
      <tr>
        <th>Patient Name</th>
        <th>Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Is Cancelled</th>
        <th></th>
        <th></th>
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
          <td>{(item.isCancelled).toString() }</td>
          <td> <Link to = {""} className="btn btn-secondary" onClick={() => openMedicalHistoryModal(item.medicalHistory)} >Medical History </Link></td>
          
          <td> <Link to = {""} className="btn btn-success mx-2" onClick={() => openNotesModalForItem(item._id)}>Notes  </Link></td>
          {/* onClick={onOpen} */}
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

<Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isNotesModalOpen}
        onClose={onNotesModalClose}
        // isOpen={isOpen}
        // onClose={onClose}
        isCentered={true} 

      >
        <ModalOverlay />
        <ModalContent bg="gray.100" borderRadius="md">
          <ModalHeader fontSize="xl" color="white">Doctor Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="md">Notes</FormLabel>
              <Textarea 
              ref = {initialRef}
               value={notesValue}
              onChange={(event) => setnotesValue(event.target.value)}
              placeholder='Add your notes here'
        size='sm'
      />

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" size="md" mr={3} onClick={handleSaveClick}>
              Save
            </Button>
            <Button size="md" onClick={onNotesModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal
        // isOpen={isOpen}
        // onClose={onClose}
        isOpen={isMedicalHistoryModalOpen}
        onClose={onMedicalHistoryModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="gray.100" borderRadius="md">
          <ModalHeader fontSize="xl" color="white">Medical History</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              value={medicalHistory}
              readOnly
              placeholder="Medical history will be displayed here"
              size="sm"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" size="md" onClick={onMedicalHistoryModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


</>


)
}
                
                    
export default ShowDocAppt;