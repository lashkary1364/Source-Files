import React from "react";
import { Switch, BrowserRouter as Router, Route ,Redirect } from "react-router-dom";
// import routes from "./routes";
// import withTracker from "./withTracker";
import Login from "./login";
import { NotFound } from "./views/NotFound"
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../src/login/css/fontiran.css'
import './assets/ag-grid.css'
import PrivateRoute from "./PrivateRoute";

export default () => (
  
  <Router basename={process.env.REACT_APP_BASENAME || ""}>   
    <Switch>
    <Route path="/" key={100000} exact component={Login}></Route>
    <PrivateRoute></PrivateRoute>
    </Switch>
  </Router>

);
