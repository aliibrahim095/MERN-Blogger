import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "../../App";
import { useParams ,Link} from "react-router-dom";

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
    setShowFollow(state ? !state.following.includes(userid) : true);
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={userProfile ? userProfile.user.pic : "loading..."}
              />
            </div>
            <div>
              <h4>{userProfile && userProfile.user.name}</h4>
              <h5>{userProfile && userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "109%",
                }}
              >
                <h6>
                  {userProfile && userProfile.posts.length}
                  {userProfile && userProfile.posts.length == 1 ? (
                    <b> Post</b>
                  ) : (
                    <b> Posts</b>
                  )}
                </h6>
                <h6>
                  {userProfile && userProfile.user.followers.length} Followers
                </h6>
                <h6>
                  {userProfile && userProfile.user.following.length} Following
                </h6>
              </div>

              {showfollow ? (
                <button
                  style={{ margin: "10px" }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUser()}
                >
                  follow
                </button>
              ) : (
                <button
                  style={{ margin: "10px" }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unfollowUser()}
                >
                  unfollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile &&
              userProfile.posts.map((item) => {
                return (
                  <img
                    key={item._id}
                    className="item"
                    src={item.photo}
                    alt={item.title}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <h2>Loading...!!</h2>
      )}
      {state && (
        <div id="btnAddNewPost">
          <Link className="addlink" to="/create">
          <button className="addNewPost">+</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserProfile;
