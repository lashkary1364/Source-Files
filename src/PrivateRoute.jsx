import { Component } from 'ag-grid-community';
import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import routes from "./routes";
import withTracker from "./withTracker";

const PrivateRoute = () => {
    //const location = useLocation()
    //localStorage.setItem('user','1234')
    const location = window.location.pathname;
    // const currentURL = window.location.href
    console.log("Current Location:")
    console.log(location)

    const isAuth = true
    return (
        <div>
            {
                isAuth == true ?
                    routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={withTracker(props => {
                                    return (
                                        <route.layout {...props}>
                                            <route.component {...props} />
                                        </route.layout>
                                    );
                                })}></Route>

                        )
                    })

                    : <Redirect to="/login"   ></Redirect>
            }
        </div>

    )
}



export default PrivateRoute;