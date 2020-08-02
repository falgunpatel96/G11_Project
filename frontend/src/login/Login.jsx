/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485 
*/
import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import auth from "../auth";
import CONST from "../constants";

class Login extends Component {
  state = {
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    commonError: "",
  };

  updateValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateInputs = (e) => {
    const errors = {
      emailError: "",
      passwordError: "",
      commonError: "",
    };

    if (this.state.email.length === 0) {
      errors.emailError = "Email cannot be empty!";
    } else if (this.state.email.indexOf("@") === -1) {
      errors.emailError = "Requires valid email";
    }

    if (this.state.password.length === 0) {
      errors.passwordError = "Password cannot be empty!";
    }

    this.setState({
      ...this.state,
      ...errors,
    });
  };

  loginUser = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let userData = {
      email: this.state.email,
      password: this.state.password,
    };

    let url = CONST.URL + "login";

    await axios
      .post(url, { data: userData }, config)
      .then((res) => {
        if (res["status"] === 200) {
          if (typeof Storage !== "undefined") {
            localStorage.setItem("userid", res["data"]["userid"]);
            localStorage.setItem("role", res["data"]["role"]);
          }

          auth.login(() => {
            this.props.history.push("/create");
          });
        }
      })
      .catch((err) => {
        const errors = {
          commonError: "",
        };
        errors.commonError = "The username or password is not correct!";
        this.setState({
          ...this.state,
          ...errors,
        });
      });
  };

  btnClick = (e) => {
    e.preventDefault();

    this.validateInputs();

    this.loginUser();
  };

  render() {
    return (
      <section>
        <section className="container pt-4 pb-4">
          <section className="row ">
            <section className="container">
              <section className="row justify-content-center">
                <section className="col-12 col-sm-6 col-md-4 signup-section border rounded">
                  <section className="col-sm-12 text-center">
                    <h3 className="registerTitle">Login</h3>
                    <p align="left" style={{ color: "red" }}>
                      {this.state.commonError}
                    </p>
                  </section>
                  <form>
                    <main className="form-group">
                      <label>Email address</label>
                      <input
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.updateValues(e)}
                        type="email"
                        className="form-control"
                        placeholder="Enter email address"
                      ></input>
                      <p align="left" style={{ color: "red" }}>
                        {this.state.emailError}
                      </p>
                    </main>

                    <main className="form-group">
                      <label>Password</label>
                      <input
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.updateValues(e)}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                      ></input>
                      <p align="left" style={{ color: "red" }}>
                        {this.state.passwordError}
                      </p>
                    </main>

                    <div className="container text-center">
                      <button
                        type="submit"
                        onClick={this.btnClick}
                        className="btn btn-primary"
                        style={{ background: "#2888d1" }}
                      >
                        Log in
                      </button>
                      <p />
                      <p className="forgot-password text-left">
                        Forgot password?{" "}
                        <a href="/resetpassword"> Reset password</a>
                      </p>
                      <p className="register text-left">
                        Don't have account?
                        <a href="/register"> Register</a>
                      </p>
                    </div>
                  </form>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default Login;
