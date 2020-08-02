import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logoimage from "../img/tracker_icon.png";
import { Navbar, Nav } from "react-bootstrap";
import "../common-css/styles.css";

class AppHeader extends Component {
  render() {
    return (
      <section>
        {/*The navigation bar libraries are taken from https://react-bootstrap.github.io/components/navbar/ [7]. */}
        <Navbar className="navHeader" expand="lg">
          <Navbar.Brand href="/">
            <img className="logoimage" src={logoimage} alt="logo" />
          </Navbar.Brand>
          <Nav style={{ marginRight: 0, marginLeft: "auto" }} id="login-button">
            <Nav.Link className="text-light font-weight-bold" href="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar>
      </section>
    );
  }
}

export default AppHeader;
