import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/user.actions";

export function LoginSignup(props) {
  const [loginCred, setLoginCred] = useState({ username: "" });
  const [signupCred, setSignupCred] = useState({ username: "" });

  const dispatch = useDispatch();

  async function onLogin(ev) {
    ev.preventDefault();
    try {
      dispatch(login(loginCred));
      props.history.push("/");
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function onSignup(ev) {
    ev.preventDefault();
    try {
      dispatch(signup(signupCred));
      props.history.push("/");
    } catch (error) {
      console.log("error:", error);
    }
  }

  function handleChange({ target }) {
    const field = target.name;
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

    if (field === "loginCred") setLoginCred({ username: value });
    if (field === "signupCred") setSignupCred({ username: value });
  }

  return (
    <section className="login-signup">
      <h2>Sign up:</h2>
      <form onSubmit={onSignup}>
        <input
          value={signupCred.username}
          onChange={handleChange}
          type="text"
          name="signupCred"
          id="signupCred"
        />
        <button>sign up</button>
      </form>
      <h2>Log in:</h2>
      <form onSubmit={onLogin}>
        <input
          value={loginCred.username}
          onChange={handleChange}
          type="text"
          name="loginCred"
          id="loginCred"
        />
        <button>log in</button>
      </form>
    </section>
  );
}
