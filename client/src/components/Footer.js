import React from "react";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About Blogger</h5>
            <p className="grey-text text-lighten-4">
              This Blogger made in ITI -- Information Technology Institute
              Intake 41 Mansoura Branch
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Get in touch</h5>
            <ul>
              <li style={{padding:"5px"}}>
                <a
                  className="waves-effect waves-light btn"
                  href="https://www.linkedin.com/in/aliibrahim095"
                >Linkedin</a>
              </li>
              {/* <li style={{padding:"5px"}}>
                <a
                  class="waves-effect waves-light btn"
                  href="https://www.facebook.com/4li.i8rahim"
                >
                  <i class="fa fa-facebook fa-fw"></i> Facebook
                </a>
              </li> */}
              <li style={{padding:"5px"}}>
                <a
                  className="waves-effect waves-light btn"
                  href="4liebrahim@gmail.com"
                >Google
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 All Rights Reserved to Ali.Inc
          <a className="grey-text text-lighten-4 right" href="#!">
            Made In ITI
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
