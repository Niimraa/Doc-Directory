import React from "react";
import { useEffect, useState } from "react";
import "../../css/Review.css"
import Select from "react-dropdown-select";

import { Box, Button, Textarea, Text, SimpleGrid } from '@chakra-ui/react';




export function ReviewByPatient(props){

    const [editable, setEditable] = useState(false);
    const [starRating, setStars] = useState(props.review.starRating);
    const [reviewText, setText] = useState(props.review.reviewText);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          // Collect all values
          const formData = {
            starRating,
            reviewText,
          };
          // Check if any required field is empty
          const requiredFields = ['starRating', 'reviewText',];
          const isEmptyField = requiredFields.some(field => !formData[field]);
      
          if (isEmptyField) {
            alert('Please fill in all required fields.');
          }
          else{
            const newReviewResponse = await sendDataToServer(formData);
            window.location.reload();
          }
          
        }
        catch{
            console.error('Error: something went wrong');
        }
    }
    const sendDataToServer = async (formData) => {
        try {
          const response = await fetch(`http://localhost:8000/reviewCURD/${props.review._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
      
          return data; // Return the newly created doctor data, including the _id
        } catch (error) {
          console.error('Error sending data to server:', error);
          // Handle the error appropriately, such as displaying an error message.
          throw error; // Rethrow the error to handle it in the calling function
        }
      };
      const deleteReview = async () => {
        try {
          const response = await fetch(`http://localhost:8000/reviewCURD/${props.review._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
          });
      
          const data = await response.json();
          window.location.reload();
          return data; // Return the newly created doctor data, including the _id
        } catch (error) {
          console.error('Error sending data to server:', error);
          // Handle the error appropriately, such as displaying an error message.
          throw error; // Rethrow the error to handle it in the calling function
        }
      };

      const options = [
        {
          rating: 1,
        },
        {
            rating: 2,
        },
        {
            rating: 3,
        },
        {
            rating: 4,
        },
        {
            rating: 5,
        },
      ];



    // if (!editable){
    //   if (props.review.doctorId.firstName != null){
    //     if (!props.editing){
    //       return(
        
    //     <div className="review">
    //         <div className="patientName">Posted About: {props.review.doctorId.firstName} {props.review.doctorId.lastName}</div>
    //         <div className="timeRating">
    //             <div>Created On {props.review.createdAt.slice(0,10)}</div>
    //             <div className="rating">Rating {props.review.starRating}/5</div>
    //         </div>
    //         <button className="revButton" onClick={() => {setEditable(true); props.setEditing(true) }}>Edit</button>
    //         <button className="revButton" onClick={deleteReview}>Delete</button>
    //         <div className="reviewText">{props.review.reviewText}</div>
    //     </div>
    // )
    //     }
    //     else{
    //       return(
        
    //         <div className="review">
    //             <div className="patientName">Posted About: {props.review.doctorId.firstName} {props.review.doctorId.lastName}</div>
    //             <div className="timeRating">
    //                 <div>Created On {props.review.createdAt.slice(0,10)}</div>
    //                 <div className="rating">Rating {props.review.starRating}/5</div>
    //             </div>
    //             <div className="reviewText">{props.review.reviewText}</div>
    //         </div>
    //     )
    //     }
        
    //   }
    //   else{
    //     return(
        
    //       <div className="review">
    //           <div className="patientName">{props.review.patientId.firstName} {props.review.patientId.lastName}</div>
    //           <div className="timeRating">
    //               <div>Created On {props.review.createdAt.slice(0,10)}</div>
    //               <div className="rating">Rating {props.review.starRating}/5</div>
    //           </div>
    //           <button className="revButton" onClick={() => setEditable(true)}>Edit</button>
    //           <button className="revButton" onClick={deleteReview}>Delete</button>
    //           <div className="reviewText">{props.review.reviewText}</div>
    //       </div>
    //   )
    //   }
        
    // }
    // else{
    //     return(
    //         <form>
    //             <div className="revIn">
    //                 {
    //                 <div className='rating'>
                      
    //                   <p>Rating: </p>
    //                   <Select values={[{rating: starRating}]} options={options} labelField="rating" valueField="rating" onChange={(value) => setStars(value[0].rating)} searchable={false}></Select>
    //                 </div>
    //               }
    //               {
    //                 <div>
    //                   <textarea
    //                     type="text"
    //                     placeholder="Review body"
    //                     defaultValue={reviewText}
    //                     onChange={(e) => setText(e.target.value)}
    //                     className="submitText"
    //                   />
    //                 </div>
    //               }
    //               {
    //               <div>
    //                 <button className="revButton" type="button" onClick={() => 
    //                 {setEditable(false)
    //                 setStars(props.review.starRating)
    //                 setText(props.review.reviewText)
    //                 props.setEditing(false)}}>Cancel</button>
    //               <button className="revButton" type="button" onClick={handleFormSubmit}>UPDATE Review</button>
    //             </div>}
                
    //             </div>
    //         </form >



    if (!editable) {
      if (props.review.doctorId.firstName != null) {
        if (!props.editing) {
          return (
            <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
              <Text fontSize="lg">Posted About: {props.review.doctorId.firstName} {props.review.doctorId.lastName}</Text>
              <Text fontSize="sm" color="gray.500" mb={2}>Created On {props.review.createdAt.slice(0, 10)}</Text>
              <Text mb={3}>Rating {props.review.starRating}/5</Text>
              <Button colorScheme="blue" onClick={() => { setEditable(true); props.setEditing(true) }}>Edit</Button>
              <Button colorScheme="red" ml={2} onClick={deleteReview}>Delete</Button>
              <Text mt={3}>{props.review.reviewText}</Text>
            </Box>
          );
        } else {
          return (
            <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
              <Text fontSize="lg">Posted About: {props.review.doctorId.firstName} {props.review.doctorId.lastName}</Text>
              <Text fontSize="sm" color="gray.500" mb={2}>Created On {props.review.createdAt.slice(0, 10)}</Text>
              <Text mb={4}>Rating {props.review.starRating}/5</Text>
              <Text mt={4}>{props.review.reviewText}</Text>
            </Box>
          );
        }
      } else {
        return (
          <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
            <Text fontSize="lg">{props.review.patientId.firstName} {props.review.patientId.lastName}</Text>
            <Text fontSize="sm" color="gray.500" mb={2}>Created On {props.review.createdAt.slice(0, 10)}</Text>
            <Text mb={4}>Rating {props.review.starRating}/5</Text>
            <Button colorScheme="blue" onClick={() => setEditable(true)}>Edit</Button>
            <Button colorScheme="red" ml={2} onClick={deleteReview}>Delete</Button>
            <Text mt={4}>{props.review.reviewText}</Text>
          </Box>
        );
      }
    } else {
      return (
        <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md" >
          <form>
            <Box className='rating' mb={4}>
              <Text fontSize="lg">Rating:</Text>
              <Select values={[{rating: starRating}]} options={options} labelField="rating" valueField="rating" onChange={(value) => setStars(value[0].rating)} searchable={false}>
                {options.map((option) => (
                  <option key={option.rating} value={option.rating}>{option.rating}</option>
                ))}
              </Select>
            </Box>
            <Textarea value={reviewText} onChange={(e) => setText(e.target.value)} mb={4} />
            <Button colorScheme="red" onClick={() => { setEditable(false); setStars(props.review.starRating); setText(props.review.reviewText); props.setEditing(false) }}>Cancel</Button>
            <Button colorScheme="blue" ml={2} onClick={handleFormSubmit}>UPDATE Review</Button>
          </form>
        </Box>

 
       )


  }
}