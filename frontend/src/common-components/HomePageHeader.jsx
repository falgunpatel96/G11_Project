import React, { Component } from "react";
import "../common-css/styles.css";
import auth from "../auth";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleLogout = (e) => {
    auth.logout(() => {
      if (localStorage.getItem("authenticated") !== null) {
        localStorage.removeItem("authenticated");
        localStorage.removeItem("userid");
        localStorage.removeItem("role");
      }
      this.props.history.push("/");
    });
  };

  onSearch = (e) => {
    e.preventDefault();
    let search = this.state.search;

    let pathname = this.props.location.pathname;

    if (search && search.trim()) {
      if (pathname !== "/view-task") {
        this.props.history.push({
          pathname: "/view-task",
          state: {
            taskid: search,
          },
        });
      } else if (pathname === "/view-task") {
        window.location.reload();
        this.props.history.push({
          pathname: "/view-task",
          state: {
            taskid: search,
          },
        });
      }
      this.setState({
        search: "",
      });
    }
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <section>
        {/*The navigation bar libraries are taken from https://react-bootstrap.github.io/components/navbar/ [7]. */}
        <Navbar className="navHeader-authenticated" expand="lg">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-light font-weight-bold"
          >
            Menu
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link className="text-light font-weight-bold" href="/home">
                Project
              </Nav.Link>
              <Nav.Link className="text-light font-weight-bold" href="/search">
                Search
              </Nav.Link>
              <Nav.Link className="text-light font-weight-bold" href="/create">
                Create
              </Nav.Link>
              <Nav.Link
                className="text-light font-weight-bold"
                href="/dashboard"
              >
                Dashboard
              </Nav.Link>
              <Nav.Link className="text-light font-weight-bold" href="/users">
                Users
              </Nav.Link>
            </Nav>
            <Form inline>
              <input
                className="form-control my-2 mr-sm-2 search border rounded"
                type="number"
                placeholder="Search"
                aria-label="Search"
                value={this.state.search}
                onChange={this.handleOnChange}
                name="search"
              />
              <Button
                className="text-light"
                variant="outline-success"
                onClick={this.onSearch}
                type="submit"
              >
                Search
              </Button>
            </Form>
            <Button
              className="text-light ml-auto mr-2"
              onClick={this.handleLogout}
              variant=""
            >
              <i className="fas fa-sign-out-alt" />
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </section>
    );
  }
}

export default withRouter(HomePageHeader);
