import { Route, HashRouter as Router, Switch } from "react-router-dom";
import "./assets/scss/main.scss";
import { Home } from "./views/Home";
import { ContactIndex } from "./views/ContactIndex";
import { ContactDetails } from "./views/ContactDetails";
import { ContactEdit } from "./views/ContactEdit.jsx";
import { LoginSignup } from "./views/LoginSignup.jsx";
import { Statistic } from "./views/Statistic";
import { AppHeader } from "./cmps/AppHeader";

function App() {
  return (
    <Router>
      <AppHeader />

      <main className="main-app">
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEdit} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/statistic" component={Statistic} />
          <Route path="/contact" component={ContactIndex} />
          <Route path="/signup" component={LoginSignup} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
