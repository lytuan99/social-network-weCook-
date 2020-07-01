import React, { Component } from 'react'

export default class SearchAndCategory extends Component {
    render() {
        return (
            <div className=" blog-sidebar">
                <div className="right-side-blog">
                    <h3>Tìm kiếm</h3>
                    <div className="blog-search-form">
                        <input name="search" placeholder="Search blog" type="text" />
                        <button className="search-btn">
                            <i className="fa fa-search" aria-hidden="true" />
                        </button>
                    </div>
                    <h3>Danh mục</h3>
                    <div className="blog-categories">
                        <ul>
                            <li><a href="#"><span>Món nướng</span></a></li>
                            <li><a href="#"><span>Món chay</span></a></li>
                            <li><a href="#"><span>Tết nguyên đán</span></a></li>
                            <li><a href="#"><span>Tết hàn thực</span></a></li>
                            <li><a href="#"><span>Làm bánh</span></a></li>
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
