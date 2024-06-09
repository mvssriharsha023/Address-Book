import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://13.53.173.235/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);

          if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/home");
          }
          else {
            e.preventDefault();
            alert("Provide correct credentials");
            setCredentials({email: "", password: ""})
          }
    }
  return (
    <>
    <Link to="/login" type="submit" className="btn btn-dark my-3 mx-3 btn-lg invisible">
          Go Back
        </Link>
    <h1  className="container my-3">Address Book - Login</h1>
      <form className=" container my-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button  onClick={handleSubmit} style={{padding: "10px 15px 10px 15px"}} type="submit" className="btn btn-dark">
          Log In
        </button>
        <div className="my-2">Don't have an account? <Link to="/signup">Register Now</Link></div>
      </form>
    </>
  );
};

export default Login;
