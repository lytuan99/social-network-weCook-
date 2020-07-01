import React, { useState, useEffect } from 'react'
import BlogDetail from './blog/BlogDetail'
import SearchAndCategory from './widget/SearchAndCategory'
import CurrentBlog from './widget/CurrentBlog'
import { Layout, Menu, Breadcrumb } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined, DeleteOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import BlogAPI from '../api/blog'

import Blog from './blog/Blog'
function Home() {
    const { Header, Content, Footer } = Layout;

    const [blogs, setBlogs] = useState([])
    const [paging, setPaging] = useState({currentPage: 1, size: 1, totalItem: null, totalPage: null})
    const [showDownArrow, setShowDownArrow] = useState(true)

    useEffect(() => {
      rechieveBlogs();
    }, [paging.currentPage])

    const rechieveBlogs = async () =>{
      let res = await BlogAPI.getAllBlog(paging.currentPage, paging.size)
      console.log("all: ", res.data)
        setBlogs(res.data.blogs)
        setPaging({...paging, totalItem: res.data.totalItems, totalPage: res.data.totalPages}) 
      
      

    }

    const onIncreasePage = (e) => {
      e.preventDefault();
      if((paging.currentPage + 1) == paging.totalPage)
        setShowDownArrow(false)
      setPaging((paging) => ({...paging, currentPage: paging.currentPage + 1}))
    }

    return (
        <Content style={{background: 'rgb(255, 241, 184)', height: '100%'}}>
      
      <div className="site-layout-content">
      <div className="row" style={{marginLeft:'100px'}}>
                {
                  blogs.length == 0
                  ? ''
                  :
                   blogs.map((blog, index) => {
                      return <Blog blog={blog} key={index}/>
                  })
                }
            </div>
      </div>
      <div>

      {
        showDownArrow ? <DownOutlined className="downOutline" onClick={onIncreasePage}/> : ''
      }
      </div>
      
    </Content>
            
                
        
    )
}

export default Home;
