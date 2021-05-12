import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { UserContext } from "../../App";
const SubscribesUserPosts = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/getsubpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletPost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        window.location.replace("http://localhost:3000/");
      });
  };
  return (
    <div className="home">
      {data &&
        data.map((item) => {
          return (
            <div
              className="card home-card"
              style={{ borderRadius: "20px", padding: "1px" }}
              key={item._id}
            >
            <div className="userPicAndName">
                <img 
                    style={{ width: "40px", height: "40px", borderRadius: "20px",marginTop:"6px",marginLeft:"7px" }}
                    src={item.postedBy.pic}
                />
                <h5>
                    <Link
                    style={{ fontWeight: "bold", marginLeft: "7px" }}
                    className="linktoprofile white-text text-darken-2"
                    to={
                        item.postedBy._id !== state._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                    >
                    {item.postedBy.name}
                    </Link>
                    {item.postedBy._id == state._id && (
                    <i 
                        className="deleteicon material-icons"
                        style={{ float: "right" }}
                        onClick={() => deletPost(item._id)}
                    >
                        delete
                    </i>
                    )}
                </h5>
              </div>
              <div className="card-image">
                <img
                  className="cardimagepost"
                  style={{ borderRadius: "20px" }}
                  src={item.photo}
                />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                {item.likes.includes(state._id) ? (
                  <i
                    className="material-icons thumbyicon"
                    onClick={() => unLikePost(item._id)}
                  >
                    thumb_down
                  </i>
                ) : (
                  <i
                    className="material-icons thumbyicon"
                    onClick={() => likePost(item._id)}
                  >
                    thumb_up
                  </i>
                )}

                <h6>{item.likes.length} Likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500", color: "red" }}>
                        {record.postedBy.name}{" "}
                      </span>
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="add comment" />
                </form>
              </div>
            </div>
          );
        })}

      {state && (
        <div id="btnAddNewPost">
          <Link className="addlink" to="/create">
          <button className="addNewPost">+</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubscribesUserPosts;
