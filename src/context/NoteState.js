// import React, { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://13.53.173.235";
  const contactsInitial = [];
  const [contacts, setContacts] = useState(contactsInitial);

  const fetchingContacts = async () => {
    const response = await fetch(`${host}/api/contacts/getContacts`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const json = await response.json();
    setContacts(json);
  };

  const addingContact = async (name, email, phnumber, address) => {
    await fetch(`${host}/api/contacts/addContact`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phnumber: phnumber,
        address: address,
      }),
    });

    setContacts(
      contacts.concat({
        name: name,
        email: email,
        phnumber: phnumber,
        address: address,
      })
    );
  };
  const deletingContact = async (id) => {
    await fetch(`${host}/api/contacts/deleteContact/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let newContactList = contacts.filter((contact) => contact._id !== id);
    setContacts(newContactList);
  };
  const editingContact = async (id, name, email, phnumber, address) => {
    await fetch(`${host}/api/contacts/updateNote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phnumber: phnumber,
        address: address,
      }),
    });

    let newContacts = JSON.parse(JSON.stringify(contacts));

    for (let index = 0; index < newContacts.length; index++) {
      const element = newContacts[index];
      if (element._id === id) {
        newContacts[index].name = name;
        newContacts[index].email = email;
        newContacts[index].phnumber = phnumber;
        newContacts[index].address = address;
        break;
      }
    }
    setContacts(newContacts);
  };

  return (
    <NoteContext.Provider
      value={{
        contacts,
        addingContact,
        deletingContact,
        editingContact,
        fetchingContacts,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
