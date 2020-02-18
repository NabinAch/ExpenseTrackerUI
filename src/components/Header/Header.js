import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

function Header() {
  return (
    <Navbar className="navbar" bg="dark" variant="dark">
      <Navbar.Brand>My Shopping History</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
