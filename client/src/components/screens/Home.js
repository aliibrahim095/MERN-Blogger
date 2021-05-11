import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>lool</h5>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1582055628078-d24e9f63aaf4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="card-content">
        <i className="material-icons" style={{color:"red"}}>favorite</i>
          <h6>title</h6>
          <p>iti post</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
