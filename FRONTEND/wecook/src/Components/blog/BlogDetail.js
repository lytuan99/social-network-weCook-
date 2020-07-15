import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import moment from 'moment';
import {Redirect, Link} from 'react-router-dom'
import CommentAPI from '../../api/comment'
import UserAPI from '../../api/user'
import caculateTime from '../../util/CaculateDate'
const { TextArea } = Input;

export default function BlogDetail({blog}) {
    const [user, setUser] = useState({ name: '', id: '' })
    const [comments, setComments] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [text, setText] = useState(null)
    const [isR, setIsR] = useState(false)

    useEffect(() => {
        rechieveUser()
        rechieveComment()
    }, [])

    const rechieveUser = async () => {
        let userAuth = await UserAPI.getCurrentUser()
        if(userAuth){
            setUser({ name: userAuth.name, id: userAuth.userId })
        }
    }


    const rechieveComment = async () => {
        let res = await CommentAPI.getAllCommentOfBlog(blog._id);
        if (res.data) {
            let cmts = await res.data.comments.map((cmt, index) => {
                return {
                    author: <h5 style={{marginBottom: '-16px'}}>{cmt.user.name} </h5>,
                    avatar: cmt.user.avatar ? "/" + cmt.user.avatar : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
                    content: <p>{cmt.content}</p>,
                    dateTime: cmt.createTime
                }
            })
            setComments(cmts)
        }
    }

    const handleSubmit = () => {
        if(!UserAPI.getCurrentUser()){
            message.error('Bạn phải đăng nhập để thực hiện chức năng này!')
            return;
        }
        if (!text) {
            return;
        }
        setSubmitting(true)
        

        CommentAPI.postComment(blog._id, UserAPI.getCurrentUser().userId, {content: text})
        .then(res => {
            console.log("comment xong: ", res)
        })
        setTimeout(() => {
            setSubmitting(false)
            setText('')
            setComments([...comments, {
                author: <h6>{user.name} </h6>,
                avatar: UserAPI.getCurrentUser().avatar ? "/" + UserAPI.getCurrentUser().avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
                content: <p>{text}</p>,
                datetime: moment().fromNow()
            }])
        }, 1000
        );
    };

    const renderGuideSteps = () => {
        let result = []
        result = blog.guideSteps.map(item => {
            let listImages = item.imagePaths
            return (
                <div>
                    <div>
                        <blockquote>
                            <h4>Bước {item.step}:</h4>
                            <p>{item.guide}</p>
                        </blockquote>
                        <div className="row">
                            {
                                listImages && listImages.map(path => {
                                    return (
                                        <div className="col-lg-4">
                                            <div className="image-step">
                                                <img src={"/" + path} alt="ảnh" width="100%" />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <hr className="mt-3"></hr>
                </div>
            )
        })
        return result;
    }


    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'phản hồi' : 'phản hồi'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );

    const Editor = ({onSubmit, submitting }) => (
        <>
            <Form.Item>
                <TextArea rows={4}
                 onChange={(e) => {
                    if(!UserAPI.getCurrentUser()){
                        setIsR(true)
                        return;
                    }
                    setText(e.target.value)}} name="text" value={text} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} style={{ backgroundColor: '#d65106', color: 'white' }}>
                    bình luận
      </Button>
            </Form.Item>
        </>
    );

    return (
        isR ? <Redirect to={`/login`} />:
        <div>
            <div className="blog-inner-details-page">
                <div className="blog-inner-box">
                    <div className="side-blog-img">
                        <img className="img-fluid" src={"/" + blog.pathImageActive} alt="" />
                        <div className="date-blog-up">
                            
                            </div>
                    </div>
                    <div className="inner-blog-detail details-page">
                        <h2>{blog.title}</h2>
                        <ul>
                            <li><i className="zmdi zmdi-account" />Đăng bởi: 
                            <span><Link to={`/users/${blog.user.name}`} className="text-decoration-none " style={{color: '#d65106'}}>
                                {" " + blog.user.name}
                                </Link></span>
                            </li>
                            <li>|</li>
                            <li><i className="zmdi zmdi-time" />Thời gian : <span>{caculateTime.getPeriodTimeBefore(blog.createTime)}</span></li>
                            <li>|</li>
                            <span className="glyphicon glyphicon-heart text-danger" style={{ fontSize: '20px' }} /> <span> {blog.favorites}</span>
                        </ul>

                        <blockquote>
                            <h4>Nguyên liệu:</h4> <p>{blog.raw}</p>
                        </blockquote>

                        {renderGuideSteps()}
                        <h3>Bình luận</h3>


                        <>
                            {comments.length > 0 && <CommentList comments={comments} />}
                            <Comment
                                avatar={
                                    <Avatar
                                        src={
                                            UserAPI.getCurrentUser() && UserAPI.getCurrentUser().avatar
                                            ?  "/" + UserAPI.getCurrentUser().avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"}
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                        onSubmit={handleSubmit}
                                        submitting={submitting}
                                    />
                                }
                            />
                        </>
                    </div>
                </div>

            </div>
        </div>
    )
}
