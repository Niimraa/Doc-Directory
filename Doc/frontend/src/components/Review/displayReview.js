import React from "react";
import { useEffect, useState } from "react";
//import "../../css/Review.css"

import { Box, Text, Stack, Badge } from '@chakra-ui/react';



export function Review(props){
    return(
        // <div className="review">
        //     <div className="patientName">{props.review.patientId.firstName} {props.review.patientId.lastName}</div>
        //     <div className="timeRating">
        //         <div>Created On {props.review.createdAt.slice(0,10)}</div>
        //         <div className="rating">Rating {props.review.starRating}/5</div>
        //     </div>
            
        //     <div className="reviewText">{props.review.reviewText}</div>
        // </div>

    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
      <Stack direction="row" mb={2}>
        <Text fontWeight="bold" fontSize="lg">
          {props.review.patientId.firstName} {props.review.patientId.lastName}
        </Text>
        <Badge colorScheme="green">Rating {props.review.starRating}/5</Badge>
      </Stack>
      <Text color="gray.500" fontSize="sm" mb={2}>
        Created On {props.review.createdAt.slice(0, 10)}
      </Text>
      <Text color="gray.600">{props.review.reviewText}</Text>
    </Box>
    )
}