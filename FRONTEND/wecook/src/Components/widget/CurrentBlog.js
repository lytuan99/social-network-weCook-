import React, { Component } from 'react'

export default class CurrentBlog extends Component {
    render() {
        return (
            <div className="recent-box-blog">
                <div className="recent-img">
                    <img className="img-fluid" src="images/post-img-01.jpg" alt="" />
                </div>
                <div className="recent-info">
                    <ul>
                        <li><i className="zmdi zmdi-account" />Posted By : <span>Rubel Ahmed</span></li>
                        <li>|</li>
                        <li><i className="zmdi zmdi-time" />Time : <span>11.30 am</span></li>
                    </ul>
                    <h4>Duis feugiat neque sed dolor cursus, sed lacinia nisl pretium.</h4>
                </div>
            </div>
        )
    }
}
