
import React from 'react'
import {Route} from "react-router-dom";

export default function RouteWithSubRoute(route) {
    return (
        <Route path={route.path} exact={route.exact} component={route.component}/>
    )
}

