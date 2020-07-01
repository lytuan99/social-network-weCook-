import React, { Component } from 'react'
import { Button, Avatar, Card } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

function OtherBlog({blog, user}) {

    

    const { Meta } = Card;
    return (
        <Card className="mx-2 my-4" style={{background: '#fff566'}}>
            <div className="row">
                <div className="col-sm-2">
                    <Avatar src="/images/img-03.jpg" size={40} icon={<UserOutlined />}/>
                </div>
                <div className="col-sm-8">
                    <Link to={`/users/${user.name}`} className="text-decoration-none">
                        <strong className="ml-2 text-dark">{user.name}</strong>
                    </Link>
                <p className="ml-2">2 giờ trước</p>
                </div>
                <div className="col-sm-2">
    <span className="glyphicon glyphicon-heart">  {blog.favorites}</span>
                </div>
            </div>
            <hr style={{marginTop: '-10px'}}></hr>
            <Link to={`/users/${user.name}/blogs/${blog._id}`} className="text-decoration-none">
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={"/" + blog.pathImageActive} />}
                >
                    <Meta title={blog.title} description={<p>{blog.raw}</p>} />
                </Card>
            </Link>
           
        </Card>
        
        )
}

export default OtherBlog;