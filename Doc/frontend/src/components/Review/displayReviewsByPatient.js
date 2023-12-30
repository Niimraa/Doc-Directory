import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewByPatient } from "./displayReviewByPatient";
export function  DisplayReviewsByPatient(props){
    const [reviews, setReviews] = useState([]);  
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:8000/reviewCURD/pat/${props.patId}`)
        .then((response) => response.json())
        .then((data) => {
           setReviews(data);
        })
        .catch((error) => {
           console.error('Error fetching data:', error);
         });
    }, []);

    if (reviews.reviews && reviews.reviews.length > 0){
         return(
        
        <div>
            <div className="patientName">
            {reviews &&
            reviews.reviews.map((review) => {
                return <ReviewByPatient key={review._id} review={review} editing={editing} setEditing={setEditing}/>
            })}</div>
        </div>
    )   
    }
    else{
        return(
            <div>No Reviews at this time</div>
        )
    }
}