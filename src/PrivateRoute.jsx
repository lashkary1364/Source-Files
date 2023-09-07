import { Component } from 'ag-grid-community';
import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import routes from "./routes";
import withTracker from "./withTracker";
import Login from "./login";

const PrivateRoute = () => {

    const location = window.location.pathname;
    console.log("Current Location:")
    console.log(location)
    let isAuth = false;

    if (sessionStorage.getItem("mohitId") == null || sessionStorage.getItem("salId") == null || localStorage.getItem("access-tocken") == null ||   sessionStorage.getItem("LoginTocken") ==null) {
        isAuth = false;
    } else {
        isAuth = true;
    }


    return (
        <div>
            {

                isAuth == true ?
                    routes.map((route, index) => {
                        return (
                            // <React.Suspense key={index} fallback={<span>loading ...</span>}>
                            <>
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
                                    })}
                                ></Route>


                            </>


                            // </React.Suspense>


                        )
                    })

                    :
                    <Route path="/" key={100000} exact component={Login}></Route>
                    
                    // <Redirect to="/"   ></Redirect>
            }
        </div>

    )
}



export default PrivateRoute;