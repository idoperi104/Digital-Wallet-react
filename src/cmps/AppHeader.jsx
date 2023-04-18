import { Link, NavLink, withRouter } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header header">
      <h1 className="logo">Wallet</h1>
      <nav className="main-nav flex align-center">
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