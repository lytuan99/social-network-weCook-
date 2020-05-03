import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="col-xl-8 col-lg-8 col-12">
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
                            </ul>
                            <p>Vestibulum quis ultricies enim. Quisque eu sapien a erat congue lacinia bibendum ac massa. Morbi vehicula aliquet libero sit amet dictum. Integer vel mauris non magna consequat porttitor. Nulla facilisi. Suspendisse posuere, elit eu fringilla congue, turpis magna tempor odio, a placerat magna tortor a mauris. Phasellus lobortis turpis dui, eget mollis ex vestibulum auctor. Nunc viverra leo ut accumsan aliquet. Maecenas aliquam dolor eget felis bibendum blandit.</p>
                            <p>Nunc iaculis, massa eget pellentesque mollis, nulla mauris aliquam eros, vitae condimentum leo nisl ut purus. Etiam nibh diam, vehicula non tincidunt id, consequat nec ex. Praesent vulputate sapien non tellus ultrices hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus pellentesque arcu erat. Curabitur dapibus fringilla porta. Sed in neque sit amet ante feugiat blandit. Nulla fringilla purus diam, cursus venenatis diam luctus nec.</p>
                            <blockquote>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non feugiat lacus. Nunc nisi velit, consectetur vitae ex porttitor, placerat scelerisque mauris. Phasellus sit amet tincidunt metus, quis tempus ex. Quisque in lorem ut mi ullamcorper suscipit eu nec purus. Nam maximus sagittis iaculis.</p>
                            </blockquote>
                            <p>Vestibulum quis ultricies enim. Quisque eu sapien a erat congue lacinia bibendum ac massa. Morbi vehicula aliquet libero sit amet dictum. Integer vel mauris non magna consequat porttitor. Nulla facilisi. Suspendisse posuere, elit eu fringilla congue, turpis magna tempor odio, a placerat magna tortor a mauris.</p>
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
