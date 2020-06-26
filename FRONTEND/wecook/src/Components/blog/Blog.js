import React, { Component } from 'react'
import { Button, Avatar, Card } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';


function Blog({blog}) {

    const { Meta } = Card;
    return (
        <Card className="mx-2 my-4">
            <div className="row">
                    {/* add avatar in here */}
                <div className="col-sm-2"><Avatar src="/images/img-03.jpg" size={40} icon={<UserOutlined />}/></div>
                <div className="col-sm-8">
                    <strong className="ml-2">{blog.user.name}</strong>
                <p className="ml-2">2 giờ trước</p>
                </div>
                <div className="col-sm-2">
    <span className="glyphicon glyphicon-heart">  {blog.favorites}</span>
                </div>
            </div>
            <hr style={{marginTop: '-10px'}}></hr>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={ blog.guideSteps[0].imagePaths[0]} />}
            >
                <Meta title={blog.title} description={blog.raw} />
            </Card>
        </Card>
        
        )
}

export default Blog;