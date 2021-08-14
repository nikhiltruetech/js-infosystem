import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { StateProvider, useStateValue } from "utils/Utils.js";
// import { refreshToken } from "utils/Utils.js";

// core components
import AdminLayout from "layouts/Admin.js";
import HomeLayout from "layouts/Home.js";
import LoginPage from "views/pages/LoginPage.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";

const hist = createBrowserHistory();
const initialState = {
  authenticated: !!sessionStorage.getItem("token"),
};
const App = () => {
  const ProtectedRoute = ({ ...routeProps }) => {
    const [{ authenticated }, dispatch] = useStateValue(initialState);
    return (
      <Route
        {...routeProps}
        component={authenticated ? routeProps.component : LoginPage}
      />
    );
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "changeAuthenticated":
        return {
          ...state,
          authenticated: action.authenticated,
        };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <HashRouter history={hist}>
        <Switch>
          <ProtectedRoute path="/admin" component={AdminLayout} />
          <Route path="/home" component={HomeLayout} />
          <Redirect from="/" to="/home" />
        </Switch>
      </HashRouter>
    </StateProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
