// import React from "react";
// import "../css/IndividualPost.css";

// const IndividualPost = ({ id, title, author, description }) => {
//   return (
//     <div key={id} className="individual-post__container">
//       <div>
//         <p>Post Title:</p>
//         <h4>{title}</h4>
//       </div>
//       <p>{description}</p>
//       <div>
//         <p>Author:</p>


//         <h4 className="doctor-name">{author}</h4>
//       </div>
//     </div>
//   );
// };

// export default IndividualPost;


const IndividualPost = ({ id, title, author, description }) => {
  return (
    <div key={id} className="individual-post__container">
      <div className="post-box">
      <div>
        <p>Author:</p>
          <h4 className="doctor-name">{author}</h4>
        <div>
          <p>Article:</p>
          <h4>{title}</h4>
        </div>
        <p>{description}</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default IndividualPost;