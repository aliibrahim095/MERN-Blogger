import React, { useEffect, useState, useContext } from "react";

import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
  const {state,dispatch} = useContext(UserContext)
  const [userProfile, setProfile] = useState(null);

  const{userid} = useParams()

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result)
    });
  }, []);
  return (
      <>
        {userProfile?
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div
            style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey",
            }}
        >
            <div>
            <img
                style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
            </div>
            <div>
            <h4>{userProfile.user.name}</h4>
            <h5>{userProfile.user.email}</h5>
            <div
                style={{
                display: "flex",
                justifyContent: "space-between",
                width: "109%",
                }}
            >
                <h6>{userProfile.posts.length}{(userProfile.posts.length==1)?<sm> Post</sm>:<sm> Posts</sm>}</h6>
                <h6>10 followers</h6>
                <h6>10 following</h6>
            </div>
            </div>
        </div>
        <div className="gallery">
            {userProfile.posts.map((item) => {
            return <img key={item._id} className="item" src={item.photo} alt={item.title} />;
            })}
        </div>
        </div>
        :<h2>Loading...!!</h2>}
    </>
  );

};

export default Profile;
