import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Registration = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
  };

  return (
    <div>
      <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary">
        <div className="form_container p-5 rounded bg-white">
          <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
            <h3 className="text-center">Sign up</h3>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please Enter your Name
              </div>
            </div> 
            <div className="mb-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please Enter your Username
              </div>
            </div> 
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please Enter your email
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Please Enter your password
              </div>
            </div>
            
            <div className="d-grid">
              <button className="btn btn-primary">Sign up</button>
            </div>
            <p className="text-end mt-2">
              Already Registered?
              <Link to="/" className="ms-4">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
