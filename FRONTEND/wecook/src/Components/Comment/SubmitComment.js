import React, { Component } from 'react'

export default class SubmitComment extends Component {
    render() {
        return (
            <div className="comment-respond-box">
                <h3>Leave your comment </h3>
                <div className="comment-respond-form">
                    <form id="commentrespondform" className="comment-form-respond row" method="post">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="form-group">
                                <input id="name_com" className="form-control" name="name" placeholder="Name" type="text" />
                            </div>
                            <div className="form-group">
                                <input id="email_com" className="form-control" name="email" placeholder="Your Email" type="email" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="form-group">
                                <textarea className="form-control" id="textarea_com" placeholder="Your Message" rows={2} defaultValue={""} />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <button className="btn btn-submit">Submit comment</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
