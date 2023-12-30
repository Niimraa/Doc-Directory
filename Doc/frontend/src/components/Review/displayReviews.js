import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "./displayReview";
import {
    Box,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    Button,
    VStack,
    Divider 
  } from '@chakra-ui/react';

export function  DisplayReviews(props){
    const [reviews, setReviews] = useState([]);  
    useEffect(() => {
        fetch(`http://localhost:8000/reviewCURD/doc/${props.docId}`)
        .then((response) => response.json())
        .then((data) => {
           setReviews(data);
        })
        .catch((error) => {
           console.error('Error fetching data:', error);
         });
    }, []);
    useEffect(() => {
        if (reviews.reviews != undefined){
            let review = reviews.reviews.find((element) => element.patientId._id == props.patId);
            if (review != undefined){
                props.setEditing(true);
                props.setReview(review);
            }
        }
        
    }, [reviews]);



    return (
        <Box>
        {reviews.reviews && reviews.reviews.length > 0 ? (
          <Box>
            <Box className="patientName">
              {reviews &&
                reviews.reviews.map((review) => {
                  if (review.patientId._id !== props.patId) {
                    return <Review key={review._id} review={review} />;
                  }
                })}
            </Box>
          </Box>
        ) : (
          <Box>No Reviews at this time</Box>
        )}
      </Box>

    )

    // if (reviews.reviews && reviews.reviews.length > 0){
    //      return(
    //     <div>
    //         <div className="patientName">
    //         {reviews &&
    //         reviews.reviews.map((review) => {
    //             if (review.patientId._id != props.patId){
    //                 return <Review key={review._id} review={review}/>
    //             }
    //         })}</div>
    //     </div>
    // )   
    // }
    // else{
    //     return(
    //         <div>No Reviews at this time</div>
    //     )
    // }
}