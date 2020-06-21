import React, { Component } from 'react'
import BlogDetail from './blog/BlogDetail'
import SearchAndCategory from './widget/SearchAndCategory'
import CurrentBlog from './widget/CurrentBlog'
import SubmitComment from './Comment/SubmitComment'

export default class Home extends Component {
    render() {
        return (
                <div className="row mt-5">
                    <div className="col-lg-1">
                            {/* làm cho chuyển từ màu đen thành màu đỏ khi click vào :) */}
                        <a href="" className=" position-fixed glyphicon glyphicon-heart text-dark ml-5"
                         style={{fontSize: '35px', 'margin-top': '300px'}}> <span  style={{fontSize: '15px'}}>12</span></a>
                         <a href="" className=" position-fixed glyphicon glyphicon-heart text-danger ml-5" 
                        style={{fontSize: '35px', 'margin-top': '300px'}}><span  style={{fontSize: '15px'}}>12</span></a>
                    </div>
                    <div className="col-lg-7">
                        <BlogDetail/>
                        <SubmitComment/>
                    </div>
                    <div className="col-lg-3">
                        <SearchAndCategory/>
                        <CurrentBlog/>
                    </div>

                </div>
        )
    }
}
