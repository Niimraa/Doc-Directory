import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-dropdown-select";
import "../../css/CreateReview.css"
//import { TextField, Button, Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import {
  Box,
  FormControl,
  FormLabel,
  //Select,
  Textarea,
  Button,
  VStack,
  Divider 
} from '@chakra-ui/react';





export function CreateReview(props){
    const [starRating, setStars] = useState('');
    const [reviewText, setText] = useState('');
    let doctorId = props.docId;
    let patientId = props.patId;
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          // Collect all values
          const formData = {
            doctorId,
            patientId,
            starRating,
            reviewText,
          };
          console.log(formData);
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
          const response = await fetch('http://localhost:8000/reviewCURD', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
          console.log(data);
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

      //const theme = createTheme();

    return(
        // <form onSubmit={handleFormSubmit}>
        //     <div className="revIn">
        //         {
        //         <div className='rating'>
                  
        //           <p>Rating: </p>
        //           <Select searchable={false} options={options} labelField="rating" valueField="rating" onChange={(value) => setStars(value[0].rating)}></Select>
        //         </div>
        //       }
        //       {
        //         <div>
        //           <textarea
        //             type="text"
        //             placeholder="Review body"
        //             value={reviewText}
        //             onChange={(e) => setText(e.target.value)}
        //             className="submitText"
        //           />
        //         </div>
        //       }
        //       {
        //       <div>
        //       <button className="revButton" type="Submit">SUBMIT Review</button>
        //     </div>}
        //     </div>
        // </form >

      //   <ThemeProvider theme={theme}>
      //   <Box
      //     sx={{
      //       width: "85%",
      //       margin: "0 auto", // Center the box
      //       marginTop: "20px", // Space on top
      //       marginBottom: "60px", // Space at the bottom
      //       backgroundColor: "#ffffff", // White background color
      //       padding: "20px", // Padding inside the box
      //     }}
      //   >
      //     <form onSubmit={handleFormSubmit}>
      //       <Box sx={{ marginBottom: 2 }}>
      //         <Typography variant="body1">Rating:</Typography>
      //         <Select
      //           searchable={false}
      //           options={options}
      //           labelField="rating"
      //           valueField="rating"
      //           onChange={(value) => setStars(value[0].rating)}
      //         />
      //       </Box>
      //       <Box sx={{ marginBottom: 2 }}>
      //         <TextField
      //           type="text"
      //           placeholder="Review body"
      //           value={reviewText}
      //           onChange={(e) => setText(e.target.value)}
      //           className="submitText"
      //           multiline
      //           fullWidth
      //           variant="outlined"
      //         />
      //       </Box>
      //       <Box>
      //         <Button type="submit" variant="contained" className="revButton">
      //           SUBMIT Review
      //         </Button>
      //       </Box>
      //     </form>
      //   </Box>
      // </ThemeProvider>


      <Box
      className="review-div"
      width="80%"
      margin="0 auto"
      marginTop="20px"
      marginBottom="40px"
      backgroundColor="#ffffff"
      padding="20px"
    >

      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Rating:</FormLabel>
            <Select
              searchable={false} 
              options={options} 
              labelField="rating" 
              valueField="rating"
              onChange={(e) => setStars(e[0].rating)}
              value={starRating}
              width="100%" // Set width to 100%
            >
              {options.map((option) => (
                <option key={option.rating} value={option.rating}>
                  {option.rating}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl width="100%"> {/* Set width to 100% */}
            <FormLabel>Review body:</FormLabel>
            <Textarea
              type="text"
              placeholder="Review body"
              value={reviewText}
              onChange={(e) => setText(e.target.value)}
              resize="vertical"
              width="100%" // Set width to 100%
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" variant="solid">
            SUBMIT Review
          </Button>
        </VStack>
      </form>
    </Box>

    )
}