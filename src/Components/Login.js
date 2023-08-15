import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';


const Login=({loginAction})=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { id: 1, username: 'user' };
    loginAction(user);
    setValidated(true);
    if (email === "" || password === "") {
      return;
    }
    navigate("/TaskManagement");

  };
  
  

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please Enter your password
            </div>
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign in</button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="null">Password?</a>{" "}
            <Link to="/registration" className="ms-4">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
 
}

export default connect(null, {loginAction})(Login);