import React, { useEffect, useState } from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Button, Avatar, message, Input} from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined, ContactsOutlined} from '@ant-design/icons';
import UserAPI from '../../../api/user'
import FollowAPI from '../../../api/follow'
import OtherBlog from '../../../Components/user/otherProfile/OtherBlog'

export default function OtherProfile(props) {
    const [userIntro, setUserIntro] = useState({ name: '', _id: null })
    const [blogs, setBlogs] = useState([])
    const [show, setShow] = useState({ blogs: false })
    const [isRedirect, setIsRedirect] = useState(false)
    const [userAuthorized, setUserAuthorized] = useState({name: UserAPI.getCurrentUser() ? UserAPI.getCurrentUser() : ''})
    const [isFollow, setIsFollow] = useState(false)
    const [listFollow, setListFollow] = useState([])
    const [amountBlog, setAmountBlog] = useState(Number)

    useEffect(() => {
        let userAuth = UserAPI.getCurrentUser();
        if(userAuth && userAuth.name == props.match.params.name){
            setIsRedirect(true)
            return;
        }
        else if(userIntro.name == '') {
               getProfileOther();
              
        }
        console.log(userIntro)
    }, [])


    const getProfileOther =async () => {
        let res = await UserAPI.getOtherProfile(props.match.params.name)
        getAmountBlogs(userIntro._id);
        if(res.data){
            await authIsFollowing(res.data.user._id)
            await getAmountBlogs(res.data.user._id);
            getListFollow(res.data.user._id)
            setUserIntro(res.data.user)
            setBlogs(res.data.blogs)
        }
    }


    const authIsFollowing = async (idUserFollow) => {
        if(!UserAPI.getCurrentUser())
            setIsFollow(false)
        else{
            let res = await FollowAPI.isFollow(UserAPI.getCurrentUser().userId, idUserFollow)
            console.log("follow: ", res.data)
            setIsFollow(res.data.status)
        }
    }

    const getListFollow = async (idUser) => {
        let res = await FollowAPI.getListFollow(idUser)
        if(res.data){
            setListFollow([...res.data.followList])
        }
        else{
            console.log("err: ", res)
        }
    }

    const onClickIntro = (e) => {
        e.preventDefault()
        setShow({ blogs: false })
    }

    const onClickBlogs = (e) => {
        e.preventDefault()
        setShow({ blogs: true })

    }

    const addFriend = async (e, idUser) => {
        let userCrr = UserAPI.getCurrentUser()
        if(userCrr){
            let res = await FollowAPI.addFollow(userCrr.userId, idUser)
            if(res.data){
                setIsFollow(!isFollow)
            }
            else{
                console.log("err: ", res)
            }
        }
        else{
            message.error('Bạn phải đăng nhập để thực hiện thao tác này!')
        }
    }

    const unFriend = async (e, idUser) => {
        let userCrr = UserAPI.getCurrentUser()
        if(userCrr){
            let res = await FollowAPI.unFollow(userCrr.userId, idUser)
            if(res.data){
                console.log(res.data)
                setIsFollow(!isFollow)
            }
            else{
                console.log("err: ", res)
            }
        }
        else{
            message.error('Bạn phải đăng nhập để thực hiện thao tác này!')
        }
    }

    const getAmountBlogs =async (idUser) => {
        let res = await UserAPI.countBlogOfUser(idUser)
        if(res.data){
            console.log("hey hey:", res.data)
            setAmountBlog(res.data.amountBlog);
        }
        else
        console.log("err", res)
    }

    
    return (
        isRedirect ? <Redirect to={`/users/${userAuthorized.name}/profile`}/>
        :
            <div>
                <div className="blog-box">
                    <div className="container text-center mb-2">
                    <Avatar 
                            src={userIntro.avatar ?
                                 "/"+userIntro.avatar
                             : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} size={80} />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="heading-title text-center">
                                    <h2>{userIntro.name}</h2>
                                    <Input.Group compact>
                                        <Input style={{ width: '12%' }} disabled={true} value={listFollow.length}
                                         addonBefore={<p className="">Bạn bếp</p>} />
                                        <Input style={{ width: '12%' }} disabled={true} 
                                        value={amountBlog ? amountBlog : 0 }
                                         addonAfter={<p>Món ăn</p>}/>
                                    </Input.Group>
                                    <div className="btn-toolbar mt-3" role="toolbar" aria-label="Toolbar with button groups">
                                        <div className="btn-group mr-2" role="group" aria-label="First group">
                                            <Button
                                                type="dashed"
                                                style={{ background: '#fa8c16', color: 'white' }}
                                                onClick={onClickBlogs}
                                            >Bài viết</Button>
                                        </div>
                                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                                            <Button
                                                type="dashed"
                                                style={{ background: '#1890ff', color: 'white' }}
                                                onClick={onClickIntro}
                                            >Giới thiệu</Button>
                                        </div>
                                        <div className="btn-group mr-2"style={{float: 'right'}}>
                                            {
                                                !isFollow 
                                                ? 
                                                <Button
                                                type="dashed"
                                                style={{ background: '#13c2c2', color: 'white' }}
                                                onClick={(e) => addFriend(e, userIntro._id)}
                                                >Kết bạn bếp</Button>
                                            :
                                            <Button
                                                type="dashed"
                                                style={{ background: '#faad14', color: 'white' }}
                                                onClick={(e) => unFriend(e, userIntro._id)}
                                            >Đang theo dõi</Button>
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ marginTop: '-2rem', marginBottom: '3rem' }}></hr>
                        {
                            !show.blogs
                                ?
                                <div className="container">
                                        <div>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <span className="text-danger">Giới tính:</span> <span>{userIntro.gender}</span>
                                                    <br />
                                                    <span className="text-danger">Ngày sinh:</span> <span>{userIntro.birthday}</span>
                                                    <br />
                                                    <span className="text-danger">Thành phố:</span> <span>{userIntro.city}</span>
                                                </div>
                                                <div className="col-lg-1" />
                                                <div className="col-lg-3">
                                                    <span className="text-danger glyphicon glyphicon-phone" /> <span>{userIntro.phoneNumber}</span>
                                                    <br />
                                                    <span className="glyphicon glyphicon-envelope text-danger mr-2" /> <span>{userIntro.email}</span>
                                                </div>
                                                <div className="col-lg-1" />
                                                <div className="col-lg-2">
                                                    <span className="text-warning glyphicon glyphicon-piggy-bank" /> <span>Tuna: {userIntro.tuna}</span>
                                                </div>
                                                <div className="col-lg-1" />
                                            </div>
                                            <hr />
                                            <div>
                                                <h3>Danh sách bạn bếp</h3>
                                                {
                                                    listFollow.length == 0 ? ''
                                                    :
                                                    listFollow.map(item => {
                                                    return <div className="friendCook">
                                                        <Avatar 
                                                            src={item.avatar ?
                                                                "/"+item.avatar
                                                            : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} size={80} />
                                                        
                                                        <Link to={`/users/${item.name}`} className="text-decoration-none"><h5 className="pt-2">{item.name}</h5></Link>
                                                        </div>
                                                    })

                                                }
                                                
                                            </div>
                                        </div>
                                </div>

                                :
                                <div>
                                    <div className="row" >
                                        {
                                            blogs.length == 0 ? <strong> Chưa có món ăn nào để hiển thị!</strong>
                                                :
                                                blogs.map((blog, index) => {
                                                    return <OtherBlog blog={blog} user={userIntro} />
                                                })
                                        }


                                    </div>
                                </div>

                        }

                    </div>
                </div>
            </div>
    )
}
