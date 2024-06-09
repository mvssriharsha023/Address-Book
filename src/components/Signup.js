import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  localStorage.clear();
    const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onClick = async (e) => {
    if (details.name.trim().length > 0) {
      if (details.email.trim().length > 0) {
        const regex_email =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        if (regex_email.test(details.email)) {
          if (details.password.trim().length > 5) {
            e.preventDefault();
            const response = await fetch(
              "http://13.53.173.235/api/auth/createUser",
              {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: details.name,
                  email: details.email,
                  password: details.password,
                })
              }
            );
            const json = await response.json();
            console.log(json);
            if (json.success) {
                e.preventDefault();
                localStorage.setItem("token", json.authToken)
                navigate("/home")
            }
            else {
                e.preventDefault();
                alert(json.error)
                setDetails({ name: "", email: "", password: "" })
            }
          } else {
            e.preventDefault();
            alert("Please enter a password with more than 5 characters");
          }
        } else {
          e.preventDefault();
          alert("Please enter a valid email id");
        }
      } else {
        e.preventDefault();
        alert("Please enter a valid email id");
      }
    } else {
      e.preventDefault();
      alert("Please enter a valid name");
    }
  };

  return (
    <>
    <Link to="/" type="submit" className="btn btn-outline-dark my-3 mx-3 btn-lg visible">
          Go Back
        </Link>
      <h1 className="container my-3">Address Book - Sign Up</h1>
      <form className="container my-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={details.name}
            onChange={onChange}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={details.email}
            onChange={onChange}
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
            value={details.password}
            onChange={onChange}
          />
        </div>
        <button onClick={onClick} type="submit" className="btn btn-dark">
          Register
        </button>
      </form>
    </>
  );
};

export default Signup;
