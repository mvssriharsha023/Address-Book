import React, { useEffect, useRef, useState } from "react";
import AddContact from "./AddContact";
import { useContext } from "react";
import NoteContext from "../context/noteContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { contacts, deletingContact, fetchingContacts, editingContact } =
    context;
  const [credentials, setCredentials] = useState({
    id: "",
    name: "",
    email: "",
    phnumber: "",
    address: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetchingContacts();
    }
    else {
      navigate("/")
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const updatingContact = (id, name, email, phnumber, address) => {
    ref.current.click();
    setCredentials({
      id: id,
      name: name,
      email: email,
      phnumber: phnumber,
      address: address,
    });
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
                editingContact(
                  credentials.id,
                  credentials.name.trim(),
                  credentials.email.trim(),
                  credentials.phnumber.trim(),
                  credentials.address.trim()
                );
                refClose.current.click();
              } else {
                e.preventDefault();
                alert("Please enter address");
              }
            } else {
              e.preventDefault();
              alert("Please enter a valid phone number");
            }
          } else {
            e.preventDefault();
            alert("Please enter a valid phone number");
          }
        } else {
          e.preventDefault();
          alert("Please enter a valid email id");
        }
      } else {
        e.preventDefault();
        alert("Please enter email id");
      }
    } else {
      e.preventDefault();
      alert("Please enter a valid name");
    }
  };
  return (
    <div className="container my-3">
      <AddContact />

      <>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Contact
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
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
                      type="text"
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  ref={refClose}
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <h2 className="my-3">Your Contacts</h2>

      {(contacts.length > 0)? <table className="table table-hover my-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email id</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contacte, index) => {
            return (
              <tr key={contacte._id}>
                <th scope="row">{index + 1}</th>
                <td>{contacte.name}</td>
                <td>{contacte.email}</td>
                <td>{contacte.phnumber}</td>
                <td>{contacte.address}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning max-2"
                    onClick={() => {
                      updatingContact(
                        contacte._id,
                        contacte.name,
                        contacte.email,
                        contacte.phnumber,
                        contacte.address
                      );
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      deletingContact(contacte._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> : <div className="my-3"> No contacts</div>}

      
    </div>
  );
};

export default Home;
