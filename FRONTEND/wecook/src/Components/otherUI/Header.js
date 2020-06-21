import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Login from '../user/Login';
import Signup from '../user/Signup';
import PostBlog from '../blog/PostBlog';
import Home from '../Home';
import Banner from './Banner';
import Profile from '../user/Profile';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
            showSignup: true,
            showNewDish: false,
            showProfile: false
        }
    }
    
    componentDidUpdate(nextProps, nextState) {
        if (localStorage.getItem('userLogin') !== null) {
            this.setState({
                showLogin: false,
                showSignup: false,
                showNewDish: true,
                showProfile: true
            })
        }
    }
    // componentWillMount() {
    //     if(localStorage.getItem('userLogin') === null){
    //         this.setState({
    //             showLogin: true,
    //             showSignup: true,
    //             showNewDish: false,
    //             showProfile: false
    //         })
    //     }
    //     else{
    //         this.setState({
    //             showLogin: false,
    //             showSignup: false,
    //             showNewDish: true,
    //             showProfile: true
    //         })
    //     }

    // }

    componentDidMount() {
        
    }


    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('userLogin');
        this.setState({
            showLogin: true,
            showSignup: true,
            showNewDish: false,
            showProfile: false
        })
    }


    render() {
        const { showLogin, showNewDish, showProfile, showSignup } = this.state;
        return (
            <Router>
                <header className="top-navbar">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container">
                            <a className="navbar-brand" href="index.html">
                                <img src="images/logo2.png" alt="" style={{ width: '150px', height: '60px' }} />
                            </a>
                            <div className="collapse navbar-collapse" id="navbars-rs-food">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active"><Link to={"/"} className="nav-link">Home</Link></li>
                                    {showLogin && (
                                        <li className="nav-item active"><Link to={"/login"} className="nav-link">LOGIN</Link></li>
                                    )}

                                    {showSignup && (
                                        <li className="nav-item active"><Link to={"/signup"} className="nav-link">Signup</Link></li>
                                    )}

                                    {showNewDish && (
                                        <li className="nav-item active"><Link to={"/post-blog"} className="nav-link">new dish</Link></li>
                                    )}

                                    <li className="nav-item" style={{ marginLeft: '10px' }}>
                                        <input className="nav-link btn btn-primary" type="text" placeholder="Tim kiem" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                                    </li>
                                </ul>
                            </div>
                            {showProfile && (<div className="collapse navbar-collapse" id="user_area">
                                <ul className="navbar-nav ml-auto">
                                    <div className="dropdown show">
                                        <a className="btn btn-secondary dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span id="user_avatar"><img width="30px" height="30px" src="https://123anhdep.net/wp-content/uploads/2016/02/cung-thay-avatar-than-thien-voi-bo-anh-mat-cuoi-de-thuong-dang-yeu-nhat-qua-dat-13.png" alt="" /></span>
                                            <span id="user_name">LyTuan</span>
                                            <i className="fa fa-bell" aria-hidden="true" id="bell_1" />
                                            <style dangerouslySetInnerHTML={{ __html: "\n\t\t\t\t\t\t\t\t/user_name{\n\t\t\t\t\t\t\t\t\tmargin-left: 10px;\n\t\t\t\t\t\t\t\t\tmargin-right: 10px;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t/bell_1{\n\t\t\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\t\t\tcolor: black;\n\t\t\t\t\t\t\t\t\tright: 30px;\n\t\t\t\t\t\t\t\t\ttop: -5px;\n\t\t\t\t\t\t\t\t\ttransition: 0.4s;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t" }} />
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <a className="dropdown-item" href="/" id="mess">
                                                Notification
                                            <div id="mess_area">
                                                    <span id="count_mess">5</span>
                                                    <i className="fa fa-bell" id="bell_2" aria-hidden="true" />
                                                </div>
                                                <i className="fa fa-caret-right" aria-hidden="true" />
                                                <div id="detail_mess_area">
                                                    <ul>
                                                        <li>notify 1</li>
                                                        <li>thong bao 1</li>
                                                        <li>thong bao 1</li>
                                                        <li>thong bao 1</li>
                                                        <li>thong bao 1</li>
                                                    </ul>
                                                </div>
                                                <style dangerouslySetInnerHTML={{ __html: "\n\t\t\t\t\t\t\t\t\t \n  \n\t\t\t\t\t\t\t\t  " }} />
                                            </a>
                                            <Link to={"/profile"} className="dropdown-item">Profile</Link>
                                            <a className="dropdown-item" href="" onClick={this.logout}>Log Out</a>
                                        </div>
                                    </div>
                                </ul>
                            </div>)}

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                        </div>
                    </nav>
                    <div>
                        <Banner/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/post-blog" component={PostBlog} />
                        <Route exact path="/profile" component={Profile} />
                        
                    </Switch>
                </div>
                </header>
            </Router>
        )
    }
}