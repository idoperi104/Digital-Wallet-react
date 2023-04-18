import { Link, NavLink, withRouter } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header header">
      <h1>Mr Coin</h1>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/statistic">Statistics</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </nav>
    </header>
  );
}