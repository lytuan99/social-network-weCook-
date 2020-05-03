import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // Redirect,
    // useHistory,
    // useLocation
  } from "react-router-dom";
import Home from '../Components/Home';
import Login from '../Components/user/Login';
import Signup from '../Components/user/Signup';
import StartUser from '../Components/user/StartUser';
import PostBlog from '../Components/blog/PostBlog';
export default class Routing extends Component {
    render() {
        return (
            <Router>
                <div>
                <Switch>
              <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/post-blog" component={PostBlog} />
                <Router exact path="/profile" component={StartUser} />
              </Switch>
                </div>
              
          </Router>
        )
    }
}
