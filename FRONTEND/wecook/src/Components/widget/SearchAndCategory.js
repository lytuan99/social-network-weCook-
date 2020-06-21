import React, { Component } from 'react'

export default class SearchAndCategory extends Component {
    render() {
        return (
            <div className=" blog-sidebar">
                <div className="right-side-blog">
                    <h3>Search</h3>
                    <div className="blog-search-form">
                        <input name="search" placeholder="Search blog" type="text" />
                        <button className="search-btn">
                            <i className="fa fa-search" aria-hidden="true" />
                        </button>
                    </div>
                    <h3>Categories</h3>
                    <div className="blog-categories">
                        <ul>
                            <li><a href="#"><span>Food</span></a></li>
                            <li><a href="#"><span>Pizza</span></a></li>
                            <li><a href="#"><span>Drink</span></a></li>
                            <li><a href="#"><span>Lorem Sit</span></a></li>
                            <li><a href="#"><span>Burger</span></a></li>
                            <li><a href="#"><span>Music</span></a></li>
                        </ul>
                    </div>
                    <h3>Recent Post</h3>
                    <div className="post-box-blog">
                        <div className="recent-post-box">
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
