import React, { Component } from 'react'

export default class BlogDetail extends Component {
    render() {
        return (
            <div>
                <div className="blog-inner-details-page">
                    <div className="blog-inner-box">
                        <div className="side-blog-img">
                            <img className="img-fluid" src="images/inner-blog-img.jpg" alt="" />
                            <div className="date-blog-up">
                                27 Fab
                            </div>
                        </div>
                        <div className="inner-blog-detail details-page">
                            <h3>Duis feugiat neque sed dolor cursus, sed lacinia nisl pretium.</h3>
                            <ul>
                                <li><i className="zmdi zmdi-account" />Posted By : <span>Rubel Ahmed</span></li>
                                <li>|</li>
                                <li><i className="zmdi zmdi-time" />Time : <span>11.30 am</span></li>
                                <li>|</li>
                                <span className="glyphicon glyphicon-heart text-danger" style={{fontSize: '20px'}} /> <span> 12</span>
                            </ul>

                            <blockquote>
                                    <h4>Nguyên liệu:</h4> <p>thịt chó, thịt lợn</p>
                                </blockquote>
                            <div>
                                <blockquote>
                                    <h4>Bước 1:</h4> <p>Title đặt ở đây</p>
                                </blockquote>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/52665255_1269860966494253_5478119520625229824_n.jpg" alt="ảnh" width="100%" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/artkajdf.png" alt="ảnh" width="100%" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/artkajdf.png" alt="ảnh" width="100%" />
                                    </div>
                                </div>
                            </div>
                        <hr className="mt-3"></hr>
                            <div>
                                <blockquote>
                                    <h4>Bước 1:</h4> <p>Title đặt ở đây</p>
                                </blockquote>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/artkajdf.png" alt="ảnh" width="100%" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/artkajdf.png" alt="ảnh" width="100%" />
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="imagesUpload/52665255_1269860966494253_5478119520625229824_n.jpg" alt="ảnh" width="100%" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="blog-comment-box">
                        <h3>Comments</h3>

                    </div>




                </div>
            </div>
        )
    }
}
