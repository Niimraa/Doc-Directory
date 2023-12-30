import { useState } from "react"
import { CreateReview } from "./createReview"
import { DisplayReviews } from "./displayReviews"
import { ReviewByPatient } from "./displayReviewByPatient";

import { Box, Typography } from "@mui/material";


export function CreateDisplayReview(props){
    function doNothing(param){}
    const [editing, setEditing] = useState(false);
    const [review, setReview] = useState({});
    if (!editing){
        return(
    // <div>
    //     <CreateReview docId={props.docId} patId={props.patId}></CreateReview>
    //     <DisplayReviews docId={props.docId} patId={props.patId} setEditing={setEditing} setReview={setReview}></DisplayReviews>
    // </div>
    <Box>
    <CreateReview docId={props.docId} patId={props.patId} />
    <DisplayReviews
      docId={props.docId}
      patId={props.patId}
      setEditing={setEditing}
      setReview={setReview}
    />
  </Box>
    )
    }
    else{
        return(
            // <div>
            //     <ReviewByPatient review={review} setEditing={doNothing}></ReviewByPatient>
            //     <DisplayReviews docId={props.docId} patId={props.patId} setEditing={setEditing} setReview={setReview}></DisplayReviews>
            // </div>

            <Box>
        <ReviewByPatient review={review} setEditing={doNothing} />
        <DisplayReviews
          docId={props.docId}
          patId={props.patId}
          setEditing={setEditing}
          setReview={setReview}
        />
      </Box>
            )
    }
    
}