import React from "react";
import { Component } from "react";
import { connect } from 'react-redux'
import { loadLoggedInUser, login, signup } from '../store/actions/user.actions'

class _LoginSignup extends Component {
  state = {
    loginCred: {username: ''},
    signupCred: {username: ''},
  };

  onLogin = async (ev) => {
    ev.preventDefault();
    try {
      await this.props.login(this.state.loginCred);
      this.props.history.push("/");
    } catch (error) {
      console.log("error:", error);
    }
  };

  onSignup = async (ev) => {
    console.log("ev: ", ev);
    ev.preventDefault();
    try {
      await this.props.signup(this.state.signupCred);
      this.props.history.push("/");
    } catch (error) {
      console.log("error:", error);
    }
  };

  handleChange = ({ target }) => {
    const field = target.name;
    console.log("field: ", field);
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    this.setState((state) => {
        return {...state, [field]: {username:value}}
    });
  };

  render() {
    const {loginCred, signupCred} = this.state
    return (
      <section className="login-signup">
        <h2>log in</h2>
        <form onSubmit={this.onLogin}>
          <input
            value={loginCred.username}
            onChange={this.handleChange}
            type="text"
            name="loginCred"
            id="loginCred"
          />
          <button>log in</button>
        </form>
        <h2>sign up</h2>
        <form onSubmit={this.onSignup}>
          <input
            value={signupCred.username}
            onChange={this.handleChange}
            type="text"
            name="signupCred"
            id="signupCred"
          />
          <button>sign up</button>
        </form>
      </section>
    );
  }
}


const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser
});

const mapDispatchToProps = {
  loadLoggedInUser,
  login,
  signup
};

export const LoginSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginSignup);

