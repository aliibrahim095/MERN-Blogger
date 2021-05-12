import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link , useHistory} from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link className="navlink" to="/profile">Profile</Link>
        </li>,
        <li>
          <Link className="navlink" to="/create">Create post</Link>
        </li>,
        ,
        <li>
          <Link className="navlink" to="/myfollowingposts">My Followin Posts</Link>
        </li>,
        <li>
          <button 
          style={{ marginRight: "8px",marginLeft:"5px", borderRadius: "20px"}}
            className="btn waves-effect waves-light #b71c1c red darken-4"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin")
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link className="navlink" to="/signin">Signin</Link>
        </li>,
        <li>
          <Link className="navlink" to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="black nav-wrapper">
        <Link to={state ? "/" : "signin"} className="navlink brand-logo left">
          Ali. Blogger
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
