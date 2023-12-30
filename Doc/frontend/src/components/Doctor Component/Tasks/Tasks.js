import React from 'react'
import { DisplayReviews } from '../../Review/displayReviews'
import { useParams } from 'react-router-dom';
function TAsks() {
  const docId = useParams();
  
  return (
    <div>
      <h1>Tasks</h1>
    </div>
  )
}

export default TAsks