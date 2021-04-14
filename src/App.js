import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/join" exact>
            <h1>Join</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
