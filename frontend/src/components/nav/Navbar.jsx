import { useNavigate } from "react-router";

import React from 'react';
import { Nav } from './styles';
import { Main } from '../landing/styles.jsx'



// import Landing from '../landing/Landing';

const NavBar = () => {
    const navigate = useNavigate();
  return (
    <div>
    <Nav>
    
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="logo"><a href="/">To Do List</a></div>
          </div>
          <div className="auth-btns col-md-7">
            <button className="btn sign-up">Sign Up</button>
            <button className="btn sign-in" onClick={navigate("/login")}>Log In</button>
          </div>
        </div>
      </div>
    </Nav>
    <Main>
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="col-md-12">
         
        </div>
      </div>
    </div>
  </Main>
  </div>
  )
};

export default NavBar;