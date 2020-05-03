import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div className="comment-item">
                <div className="comment-item-left">
                    <img src="images/avt-img.jpg" alt="" />
                </div>
                <div className="comment-item-right">
                    <div className="pull-left">
                        <a href="#">Rubel Ahmed</a>
                    </div>
                    <div className="pull-right">
                        <i className="fa fa-clock-o" aria-hidden="true" />Time : <span>11.30 am</span>
                    </div>
                    <div className="des-l">
                        <p>Morbi lacinia ultrices lorem id tincidunt. Cras id dui risus. Pellentesque consectetur id mi sed pharetra. Proin imperdiet gravida nisl, sit amet varius urna. In auctor.</p>
                    </div>
                    <a href="#" className="right-btn-re"><i className="fa fa-reply" aria-hidden="true" /> Reply</a>
                </div>
            </div>
        )
    }
}
