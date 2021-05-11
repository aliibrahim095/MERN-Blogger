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
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create post</Link>
        </li>,
        <li>
          <button
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
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper #f55d6d">
        <Link to={state ? "/" : "signin"} className="brand-logo left">
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
