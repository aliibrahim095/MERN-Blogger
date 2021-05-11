import React ,{useState} from "react";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css"

const Signin = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = () => {
    if (email&&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#d50000 red accent-4" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          M.toast({ html: "signed in successfully", classes: "#1b5e20 green darken-4" });
          history.push("/");
        }
      }).catch(err=>{
        console.log(err)
      })
  };


  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Blogger</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postData()}>Signin</button>
        <h5>
          <Link to="/signup">Create An Account ? </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
