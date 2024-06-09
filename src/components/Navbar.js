import React from 'react'
import { Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      Address Book
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      {(!(localStorage.getItem("token")))? <> </> :<button onClick={handleLogout} className="btn btn-outline-dark mx-1" type="submit">
          Log out
        </button> }
        
    </div>
  </div>
</nav>

  )
}

export default Navbar
