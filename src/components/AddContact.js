import React, { useContext, useState } from "react";
import NoteContext from "../context/noteContext";

const AddContact = () => {
  const context = useContext(NoteContext);
  const { addingContact } = context;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phnumber: "",
    address: "",
  });
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    if (credentials.name.trim().length > 0) {
      if (credentials.email.trim().length > 0) {
        const regex_email =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        if (regex_email.test(credentials.email)) {
          if (credentials.phnumber.trim().length === 10) {
            var regex_phnumber = new RegExp("^[0-9]{10}$");
            if (regex_phnumber.test(credentials.phnumber)) {
              if (credentials.address.trim().length > 0) {
                e.preventDefault();
                addingContact(
                  credentials.name,
                  credentials.email,
                  credentials.phnumber,
                  credentials.address
                );
                setCredentials({
                  name: "",
                  email: "",
                  phnumber: "",
                  address: "",
                })
              }
              else {
                e.preventDefault();
                alert("Please enter address");
              }
            }
            else {
              e.preventDefault();
              alert("Please enter a valid phone number");
            }
          }
          else {
            e.preventDefault();
            alert("Please enter a valid phone number");
          }
        }
        else {
          e.preventDefault();
          alert("Please enter a valid email id")
        }
      }
      else {
        e.preventDefault();
        alert("Please enter email id");
      }
    }
    else {
      e.preventDefault();
      alert("Please enter a valid name")
    }
  };
  return (
    <div>
      <h1>Add Contact</h1>
      <form>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={credentials.name}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email Id
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phnumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phnumber"
            name="phnumber"
            onChange={handleChange}
            value={credentials.phnumber}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            onChange={handleChange}
            value={credentials.address}
          />
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleClick}>
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
