import React, { useState, useEffect } from 'react'
import BlogDetail from './blog/BlogDetail'
import SearchAndCategory from './widget/SearchAndCategory'
import CurrentBlog from './widget/CurrentBlog'
import SubmitComment from './Comment/SubmitComment'
import { Layout, Menu, Breadcrumb } from 'antd';
import BlogAPI from '../api/blog'

import Blog from './blog/Blog'
function Home() {
    const { Header, Content, Footer } = Layout;

    const [blogs, setBlogs] = useState([])
    const [paging, setPaging] = useState({currentPage: 1, size: 3, totalItem: null})
    
    useEffect(() => {
      rechieveBlogs();
    }, [paging])

    const rechieveBlogs = async () =>{
      let listBlog = await BlogAPI.getAllBlog(paging.currentPage, paging.size)
      console.log("all: ", listBlog.data.blogs)
      await setBlogs(listBlog.data.blogs)

    }


    return (
        <Content style={{ padding: '0 50px' ,background: '#ffd666'}}>
      
      <div className="site-layout-content">
      <div className="row" style={{marginLeft:'100px'}}>
                {
                  blogs && blogs.map((blog, index) => {
                    return <Blog blog={blog} key={index}/>
                  })
                }
            </div>
      </div>
    </Content>
            
                
        
    )
}

export default Home;
