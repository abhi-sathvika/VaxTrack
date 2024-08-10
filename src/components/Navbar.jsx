import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";


export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
  };

  return (
    <nav>
      <Link to="/" className="title">
        VaxTrack
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {
      window.localStorage.length ?
      <div>
      <ul className={menuOpen ? "open" : ""}>
        
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/manage">Manage</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/home" onClick={handleLogout}>Logout</NavLink>
        </li>
      </ul>
      </div>
      :
      <div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
        <NavLink to="/home">Login</NavLink>
      </li>
      </ul>                   
      </div>
}
    </nav>
  );
};
