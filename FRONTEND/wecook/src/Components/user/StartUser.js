import React, { Component } from 'react'

export default class StartUser extends Component {
	render() {
		return (
			<div className="blog-box">
				<div className="container text-center mb-2">
					<img src="images/img-03.jpg" alt="" className="text-center" style={{ borderRadius: '50%' }} width={80} height={80} />
				</div>
				<div className="container"> {/*  */}
					<div className="row">
						<div className="col-lg-12">
							<div className="heading-title text-center">
								<h2>Blog</h2>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
							</div>
						</div>
					</div>
					<div className="row">
						{/* đặt các Blog của user */}
					</div>
				</div>
			</div>
		)
	}
}
