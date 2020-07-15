import React, { useEffect, useState } from 'react'
import BlogAPI from '../../api/blog'
import {Link, useHistory} from 'react-router-dom'
export default function CurrentBlog() {

    const [listBlogCurr, setListBlogCurr] = useState([])
    let history = useHistory()
    useEffect(() => {
        rechieveCurrentBlogs()
    }, [])

    const rechieveCurrentBlogs = async () => {
        let res = await BlogAPI.getCurrentBlog()
        if (res.data) {
            console.log("curent: ", res.data)
            setListBlogCurr(res.data.blogs)
        }
    }

    return (
        <div>
            {
                listBlogCurr == 0 ? ''
                :
                listBlogCurr.map(item => {
                   return (
                    <div className="recent-box-blog">
                        <Link to={`/users/${item.user.name}/blogs/${item._id}`}>
                        <div className="recent-img" style={{width: "30%"}}>
                            {
                                !item.pathImageActive ? 
                                <img className="img-fluid" src="/images/post-img-01.jpg" alt="" />
                                :
                                <img className="img-fluid" src={"/" + item.pathImageActive} alt="" />
                            }
                            
                        </div>
                        </Link>
                        <div className="recent-info">
                            <ul>
                                <li><i className="zmdi zmdi-account" />Đăng bởi: <strong>{item.user.name} </strong></li>
                                <li> | </li>
                                <li><i className="zmdi zmdi-time" /><span> 11.30 am</span></li>
                                <li> |  </li>
                                <span className="glyphicon glyphicon-heart text-danger" style={{ fontSize: '13px' }} /> <span style={{ fontSize: '13px' }} > {item.favorites}</span>
                            </ul>
                            <h4>{item.title}</h4>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}
