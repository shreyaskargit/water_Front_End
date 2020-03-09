import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dugwell from "./pages/Dugwell";
import Tubewell from "./pages/Tubewell";
import Forecast from "./pages/forecast";
import History from "../history";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={History}>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dugwell" exact component={Dugwell} />
              <Route path="/tubewell" exact component={Tubewell} />
              <Route path="/forecast" exact component={Forecast} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
