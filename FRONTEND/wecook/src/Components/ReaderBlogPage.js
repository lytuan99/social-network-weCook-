import React, { useState, useEffect } from 'react'
import { Button, Avatar, message } from 'antd';
import BlogDetail from './blog/BlogDetail'
import SearchAndCategory from './widget/SearchAndCategory'
import CurrentBlog from './widget/CurrentBlog'
import BlogAPI from '../api/blog'
import UserAPI from '../api/user'
import FavoriteAPI from '../api/favorite'


export default function ReaderBlogPage(props) {

    const [user, setUser] = useState(null)
    const [blog, setBlog] = useState(null)
    const [isRedHeath, setIsRedHeath] = useState(false)
    const [favorite, setFavorite] = useState(Number)
    useEffect(() => {
        rechieveBlog()
    }, [])


    const rechieveBlog = () => {
        let userName = props.match.params.userName
        let idBlog = props.match.params.idBlog
        BlogAPI.getOneBlog(userName, idBlog)
            .then(res => {
                let data = res.data
                console.log(data)
                setBlog(data)
                setUser(data.user)
                setFavorite(data.favorites)
                FavoriteAPI.isRedHeath(UserAPI.getCurrentUser().userId, data._id)
                .then(res => {
                    console.log("favorite: ", res)
                    setIsRedHeath(res.data.isRedHeath)
                }).catch(err => {
                    console.log("errrr: ", err.response)
                })
            }).catch(err => {
                console.log("this blog is not existed: ", err)
            })

    }

    const onChangeColorHeath = (e) => {
        e.preventDefault()
        if(!UserAPI.getCurrentUser()){
            message.error('bạn chưa đăng nhập')
            setTimeout(() => message.error('hãy đăng nhập để thực hiện thao tác này'), 1000) 
        }
        else{
            FavoriteAPI.changeColorHeath(UserAPI.getCurrentUser().userId, blog._id, favorite)
            .then(res => {
                console.log("change ne: ", res.data)
                setIsRedHeath(res.data.isRedHeath)
                setFavorite(res.data.isRedHeath ? favorite + 1 : favorite - 1)
            }).catch(err => {
                console.log("heath black ne")
            })
        }
        
    }

    return (
        <div className="row mt-5" style={{background: 'rgb(255, 241, 184)'}}>
            <div className="col-lg-1">
                {
                    isRedHeath ? <a href="" onClick={onChangeColorHeath} className="position-fixed glyphicon glyphicon-heart text-danger ml-5"
                    style={{ fontSize: '35px', 'margin-top': '300px' }}><span style={{ fontSize: '15px' }}>{favorite}</span></a>
                    :
                    <a href=""  onClick={onChangeColorHeath} className=" position-fixed glyphicon glyphicon-heart text-dark ml-5"
                style={{ fontSize: '35px', 'margin-top': '300px' }}> <span style={{ fontSize: '15px', marginLeft: '-35px' }}>{favorite}</span></a>
                }                
                
                
            </div>
            <div className="col-lg-7">
                {blog && <BlogDetail blog={blog} />}
               
            </div>

            <div className="col-lg-3">
                <SearchAndCategory />
                <CurrentBlog />
            </div>

        </div>
    )
}
