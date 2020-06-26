import React, { useEffect, useState } from 'react'
import { Button, Avatar } from 'antd';
import { EditOutlined, SaveOutlined,UserOutlined } from '@ant-design/icons';
import UserAPI from '../../../api/user'
import { Redirect } from 'react-router-dom'
import Introduce from './introduce';
import Blog from '../../../Components/blog/Blog'
import MyBlog from './myBlog'

export default function Profile() {

	const [userIntro, setUserIntro] = useState({name: ''})
	const [blogs, setBlogs] = useState([])
	const [isLogined, setIsLogined] = useState(false)
    const [show, setShow] = useState({blogs: false})
	const [isEdit, setIsEdit] = useState(false)

	useEffect( () => {
		if(userIntro.name == ''){
				let user_Token = UserAPI.getCurrentUser()
				if (user_Token) {
					UserAPI.getProfile(user_Token.name)
					.then(res => {
						setUserIntro(res.data.user)
						setBlogs(res.data.blogs)
					})
					.catch(err => {
						console.log(err)
					})
					
				}
				else
					setIsLogined(true)
			}
			
	}, [])

	const onClickIntro = (e) =>{
		e.preventDefault()
		setShow({blogs: false})
    } 

    const onClickBlogs = (e) =>{
		e.preventDefault()
		setShow({blogs: true})
        
	}

	
    const onClickEdit = (e) => {
        e.preventDefault()
        setIsEdit(true);
    }

    const onClickSave = (e) => {
        e.preventDefault()
        setIsEdit(false)

    }

    const onChangeUserIntro = (e) => {
        const { name, value } = e.target
        setUserIntro({ ...userIntro, [name]: value })
    }
	
	return (
		isLogined ? <Redirect to={"/"} /> :
			<div>
				<div className="blog-box">
					<div className="container text-center mb-2">
						<Avatar src="/images/img-03.jpg" size={80} icon={<UserOutlined />}/>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="heading-title text-center">
									<h2>{userIntro.name}</h2>
									<div className="btn-toolbar mt-3" role="toolbar" aria-label="Toolbar with button groups">
										<div className="btn-group mr-2" role="group" aria-label="First group">
										<Button 
											type="dashed" 
											style={{background:'#fa8c16', color:'white'}}
											onClick={onClickBlogs}
										>Bài viết</Button>
										</div>
										<div className="btn-group mr-2" role="group" aria-label="Second group">
										<Button 
											type="dashed"
											style={{background:'#1890ff', color:'white'}}
											onClick={onClickIntro}
										>Giới thiệu</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<hr style={{marginTop: '-2rem', marginBottom: '3rem'}}></hr>
						{
							!show.blogs
							 ? 
							 <div className="container">
            {!isEdit
                ?
                <div className="row">
                    <div className="col-lg-2">
                        <span className="text-danger">Giới tính:</span> <span>{userIntro.name}</span>
                        <br />
                        <span className="text-danger">Ngày sinh:</span> <span>{userIntro.birthDay}</span>
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
                    <div className="col-lg-2">
                        <Button
                            className="text-primary"
                            icon={<EditOutlined />}
                            onClick={onClickEdit}><span>chỉnh sửa</span></Button>
                    </div>
                </div>

                :
                <form>
                    <div className="row">
                        <div className="col-lg-5">
                            <span className="text-info">giới tính:</span>
                            <input type="text" className="form-control" placeholder="Nhập tên...."
                                name="gender" onChange={onChangeUserIntro} value={userIntro.gender}
                            />

                            <span className="text-info">Sinh nhật:</span>
                            <input type="date" className="form-control"
                                name="birthDay" onChange={onChangeUserIntro} value={userIntro.birthDay} />

                            <span className="text-info">thành phố:</span>
                            <input type="text" className="form-control"
                               name="city" onChange={onChangeUserIntro} value={userIntro.city} />

                            <span className="text-info">số điện thoại</span>
                            <input type="text" className="form-control"
                               name="phoneNumber" onChange={onChangeUserIntro} value={userIntro.phoneNumber} />
                            <div className="col-lg-1" />
                            <div className="col-lg-1">

                            </div>
                        </div>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-2 mt-5">
                            <Button
                                className="bg-success text-white"
                                icon={<SaveOutlined />}
                                onClick={onClickSave}><span>Lưu</span></Button></div>
                    </div>
                </form>
            }
        </div>
    
							 : 
							 <div className="row">
							 {
								 blogs.lenth == 0 ? <strong> Bạn chưa có món ăn nào để hiển thị! Hãy tạo món..</strong>
								 :
								 blogs.map((blog, index) => {
									 return <Blog blog={blog} key={index}/>
								 })
							 }
							 <MyBlog/>
						 </div>
						}
						
					</div>
				</div>
			</div>
	)
}
