import React, { useEffect, useState } from 'react'
import { Button, Avatar, message, Upload, Input } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined, CameraOutlined } from '@ant-design/icons';
import UserAPI from '../../../api/user'
import BlogAPI from '../../../api/blog'
import FollowAPI from '../../../api/follow'
import { Redirect , Link} from 'react-router-dom'
import MyBlog from './myBlog'

export default function Profile() {
	const PATH_UPLOAD = 'imagesUpload/'
	const [userIntro, setUserIntro] = useState({ name: '' })
	const [blogs, setBlogs] = useState([])
	const [isLogined, setIsLogined] = useState(false)
	const [show, setShow] = useState({ blogs: false })
	const [isEdit, setIsEdit] = useState(false)
	const [listFollow, setListFollow] = useState([])
    const [amountBlog, setAmountBlog] = useState(Number)


	useEffect(() => {
		window.scrollTo(0, 0);
		if (userIntro.name == '') {
			let user_Token = UserAPI.getCurrentUser()
			if (user_Token) {
				UserAPI.getProfile(user_Token.name)
					.then(res => {
						setUserIntro(res.data.user)
						setBlogs(res.data.blogs)
						getListFollow(user_Token.userId)
						getAmountBlogs(user_Token.userId);
					})
					.catch(err => {
						console.log(err)
					})

			}
			else
				setIsLogined(true)
		}

	}, [])

	const getAmountBlogs = async (idUser) => {
        let res = await UserAPI.countBlogOfUser(idUser)
        if(res.data){
            setAmountBlog(res.data.amountBlog);
        }
        else
        console.log("err", res)
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


	const onClickEdit = (e) => {
		e.preventDefault()
		setIsEdit(true);
	}

	const onClickSave = (e) => {
		e.preventDefault()
		let userUpdate = {
			gender: userIntro.gender,
			birthDay: userIntro.birthDay,
			city: userIntro.city,
			phoneNumber: userIntro.phoneNumber,
		}
		UserAPI.updateUser(userIntro._id, userUpdate)
			.then(res => {
				message.success('cập nhật thông tin thành công!')
				setIsEdit(false)
			}).catch(err => {
				message.error('có lỗi xảy ra, thử lại sau!')
			})



	}

	const onChangeUserIntro = (e) => {
		const { name, value } = e.target
		setUserIntro({ ...userIntro, [name]: value })
	}

	const onChangeAvatar = async (e) => {
		let file = e.target.files[0]
		let image = new FormData()
		image.append('image', file)
		let avatar = PATH_UPLOAD + file.name

		let res = await UserAPI.changeAvatar(avatar, userIntro._id)
		if(res){
			let resI = await BlogAPI.postImagesBlog(image)
			console.log("res avatar: ", res)
			UserAPI.changeAvatarCurrentUser(avatar);
			window.location.reload(false)
		}
			
	}


	return (
		isLogined ? <Redirect to={"/"} /> :
			<div>
				<div className="blog-box">
					<div className="container text-center mb-2">
						<div className="avatar">
							<Avatar 
							src={userIntro.avatar ? "/"+userIntro.avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} size={80} />

							<div className="fileupload">
								<input type="file" className="uploadAvatar" onChange={onChangeAvatar} />

							</div>
							<div className="cam"><CameraOutlined style={{ fontSize: '20px',
							 marginTop: '-22px',
							  position: 'absolute',
							   marginLeft: '-8px',
								color: 'white',
								}} /></div>
						</div>
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
									</div>
								</div>
							</div>
						</div>
						<hr style={{ marginTop: '-2rem', marginBottom: '3rem' }}></hr>
						{
							!show.blogs
								?
								<div className="container">
									{!isEdit
										?
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
												<div className="col-lg-2">
													<Button
														className="text-primary"
														icon={<EditOutlined />}
														onClick={onClickEdit}><span>chỉnh sửa</span></Button>
												</div>
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
										:
										<form>
											<div className="row" >
												<div className="col-lg-5">
													<span className="text-info">giới tính:</span>
													<input type="text" className="form-control" placeholder="Nhập giới tính...."
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
								<div>
									<div className="row mb-5" >
										{
											blogs.length == 0 ? <strong> Bạn chưa có món ăn nào để hiển thị! Hãy tạo món..</strong>
												:
												blogs.map((blog, index) => {
													return <MyBlog myBlog={blog} user={userIntro} />
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
