import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route } from "react-router-dom";
// import routes from "./routes";
// import withTracker from "./withTracker";
import Login from "./login"
import "bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../src/login/css/fontiran.css'
import './assets/ag-grid.css'
import PrivateRoute from "./PrivateRoute";
import {Home2} from './home2'
import { NotFound } from "./views/NotFound";
import { Picker } from "./views/Picker";

// import { ToastProvider } from 'react-toast-notifications'

export default () => (

  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
    {/* <ToastProvider> */}
      <PrivateRoute></PrivateRoute>
      {/* {routes.map((route, index) => {
  return (
    <PrivateRoute
      key={index}
      path={route.path}
      exact={route.exact}
      // component={withTracker(props => {
      //   return (
      //     <route.layout {...props}>
      //       <route.component {...props} />
      //     </route.layout>
      //   );
      // })}
    />
  );
})} */}

      <Route path="/" key={100000} exact component={Login} />
      {/* <Route path="/picker" key={100000} exact component={Picker} /> */}
      {/* <Route path="*" component={NotFound}></Route> */}
      {/* <Route path="/home2" key={100001} exact component={Home2} /> */}
      {/* </ToastProvider> */}
    </div>

  </Router>
);
