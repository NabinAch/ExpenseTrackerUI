import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link>
        <RouterLink to="/history">History </RouterLink>
      </Nav.Link>

      <Nav.Link>
        <RouterLink to="/enter">Enter Receipt </RouterLink>
      </Nav.Link>

      <Nav.Link eventKey="disabled" disabled>
        Scan Receipt
      </Nav.Link>
    </Nav>
  );
}

export default Sidebar;
