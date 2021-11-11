import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import student_icon from "../images/students-dark.png";
import "../css/navbar.css";

function NavBar() {
  const navLinkStyle = { textDecoration: "none" };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={student_icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Student Academic Details
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <NavLink
              className="nav_link"
              activeStyle={{
                borderBottom: "2px solid white",
              }}
              style={navLinkStyle}
              to="/addpage"
            >
              Add
            </NavLink>
            <NavLink
              className="nav_link"
              activeStyle={{
                borderBottom: "2px solid white",
              }}
              style={navLinkStyle}
              to="/viewpage"
            >
              View
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
