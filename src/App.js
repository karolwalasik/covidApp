import './App.css';
import Root from "./views/Root";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import News from "./views/News";

function App() {
  return (
    <Router>
      <Navigation/>
        <Switch>
            <Route path="/news">
                <News/>
            </Route>
            <Route path="/">
                <Root />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
