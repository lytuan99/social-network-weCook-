import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header className="top-navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">
                            <img src="images/logo2.png" alt="" style={{ width: '150px', height: '60px' }} />
                        </a>
                        <div className="collapse navbar-collapse" id="navbars-rs-food">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"><a className="nav-link" href="/">Home</a></li>
                                <li className="nav-item active"><a className="nav-link" href="/login">LOG IN</a></li>
                                <li className="nav-item active"><a className="nav-link" href="signup">SIGN UP</a></li>
                                <li className="nav-item active"><a className="nav-link" href="/post-blog">New dish</a></li>
                                <li className="nav-item" style={{ marginLeft: '10px' }}>
                                    <input className="nav-link btn btn-primary" type="text" placeholder="Tim kiem" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse" id="user_area">
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
                                            Message
                                            <div id="mess_area">
                                                <span id="count_mess">5</span>
                                                <i className="fa fa-bell" id="bell_2" aria-hidden="true" />
                                            </div>
                                            <i className="fa fa-caret-right" aria-hidden="true" />
                                            <div id="detail_mess_area">
                                                <ul>
                                                    <li>thong bao 1</li>
                                                    <li>thong bao 1</li>
                                                    <li>thong bao 1</li>
                                                    <li>thong bao 1</li>
                                                    <li>thong bao 1</li>
                                                </ul>
                                            </div>
                                            <style dangerouslySetInnerHTML={{ __html: "\n\t\t\t\t\t\t\t\t\t \n  \n\t\t\t\t\t\t\t\t  " }} />
                                        </a>
                                        <a className="dropdown-item" href="/">Profile</a>
                                        <a className="dropdown-item" href="/">Don hang</a>
                                        <a className="dropdown-item" href="/">Log Out</a>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                </nav>
            </header>
        )
    }
}
