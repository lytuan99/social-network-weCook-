import React, { useState, useEffect } from 'react'
import update from 'react-addons-update'
import BlogAPI from '../../api/blog'
import UserAPI from '../../api/user'
import ImageUpload from './ImageUpload'
import PictureWall from './Upload'
import { Redirect } from 'react-router-dom'
import { Button, notification, Space, message } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined, DeleteOutlined, GlobalOutlined, LockOutlined, CameraOutlined} from '@ant-design/icons';


const PATH_UPLOAD = 'imagesUpload/'

function EditBlog(props) {

    const initialBlogEdit = {title: String, raw: String}
    const initialGuideStepsEdit = [{ step: Number, guide: String, images: [] }]


    const [blog, setBlog] = useState({ title: '', raw: '', pathImageActive: '',
                                         guideSteps: [{step: Number, guide: '', imagePaths: []}],
                                        user: {name: '', _id: ''} })
    const [blogEdit, setBlogEdit] = useState(initialBlogEdit)
    const [guideStepsEdit, setGuideStepsEdit] = useState(initialGuideStepsEdit)
    const [imageActive, setImageActive] = useState(null)
    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    useEffect(() => {
        rechieveBlog();
    }, [])

    const rechieveBlog = () => {
        let userName = props.match.params.userName
        let idBlog = props.match.params.idBlog
        BlogAPI.getOneBlog(userName, idBlog)
        .then(res => {
            setBlog(res.data)
            setBlogEdit({title: res.data.title, raw: res.data.raw})
            setGuideStepsEdit(res.data.guideSteps)
            console.log(res.data)
        })

    }

    const onChangeHeadBlog = (e) => {
        const {name, value} = e.target
        setBlogEdit({...blogEdit, [name]: value})
    }

    const onClickAddStep = () => {
        setGuideStepsEdit([...guideStepsEdit, { step: guideStepsEdit.length + 1, guide: '', image: [] }])
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let blogForm = {
            user: blog.user._id,
            title: blogEdit.title,
            raw: blogEdit.raw,
            guideSteps: guideStepsEdit,
            pathImageActive: imageActive ? (String)(PATH_UPLOAD + imageActive.name) : blog.pathImageActive
        }
        
        let image = new FormData();
        image.append("images", imageActive);

        let res = await BlogAPI.updateBlog(blog.user._id, blog._id, blogForm);
        console.log("response: ", res)
        if(res.data.status){
            console.log("eyyyyy")
            BlogAPI.postImagesBlog(image)
            .then(res => {
                window.scrollTo(0, 0);
                message.success('Chỉnh sửa thành công!')
            })
        }
        else{
            message.error('có lỗi xảy ra.. tôi cũng không biết.. xin thử lại sau')
            console.log(res.response)
        }
    }



    const onChangeImageActive = (event) => {
        let image = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageUrl({ url: reader.result })
            setImageActive(image)
        }
        reader.readAsDataURL(image)

    }

    const renderGuideSteps = () => {
        let result = []
        result = guideStepsEdit.map((item, index) => {
            let listImages = item.imagePaths
            return (
                <div>
                    <div>
                        <blockquote>
                            <h4>Bước {item.step}: </h4>
                            <input type="text" className="form-control-blog" placeholder="Bạn làm bước này thế nào?"
                            value={item.guide} name="guide"
                            required image-validation-required-message="làm ơn nhập vào cách làm của bước này."
                            aria-invalid="false"
                            onChange={e => {
                                let val = e.target.value
                                setGuideStepsEdit(
                                    guideStepsEdit.map((item, i) =>
                                        i === index ? { ...item, guide: e.target.value }
                                            : item
                                    ))
                            }} 
                            />
                        </blockquote>
                        <div className="row">
                            {
                                listImages && listImages.map(path => {
                                    return (
                                        <div className="col-lg-4">
                                            <img src={"/" + path} alt="ảnh" width="100%" />
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

    return (
        <div className="container">
            <div className="row">
                <div className="blog-inner-details-page">
                    <div className="blog-inner-box">
                        <div className="side-blog-img">
                            {
                                previewImageUrl == null
                                ? <img className="img-fluid" src={"/" + blog.pathImageActive} alt="" />
                                : <img className="img-fluid" src={previewImageUrl.url} alt="" />
                            }
                            <div className="date-blog-up">
                                    <CameraOutlined className="camera"/>
                                    <input type="file" onChange={onChangeImageActive}/>
                            </div>
                        </div>
                        <div className="inner-blog-detail details-page">
                            
                            <ul>
                                <li><i className="zmdi zmdi-account" />Posted By : <span>{blog.user.name}</span></li>
                                <li>|</li>
                                <li><i className="zmdi zmdi-time" />Time : <span>{blog.createTime}</span></li>
                                <li>|</li>
                                <span className="glyphicon glyphicon-heart text-danger" style={{ fontSize: '20px' }} /> <span>{blog.favorites}</span>
                            </ul>

                            <h2>Tên món ăn:</h2>
                            <div className="form-group floating-label-form-group controls">
                                    <input type="text"
                                     className="form-control-blog"
                                      placeholder="Bạn nấu gì hôm nay?"
                                       name="title" value={blogEdit.title} onChange={onChangeHeadBlog}
                                        required image-validation-required-message="Please enter your name." aria-invalid="false" />
                                    <p className="help-block text-danger" />
                                </div>
                            <blockquote>
                                <h4>Nguyên liệu:</h4>
                                <div className="control-group">
                                <div class="md-form">
                                    <textarea id="form7"
                                     placeholder="Nguyên liệu cho món ăn của bạn?" 
                                     class="md-textarea form-control-blog"
                                      rows="3"
                                      name="raw" value={blogEdit.raw} onChange={onChangeHeadBlog}
                                      />
                                </div>
                            </div>
                            </blockquote>

                            {renderGuideSteps()}

                        </div>
                    <p className="next-step" onClick={onClickAddStep}>+ Thêm bước..</p>

                    </div>
                </div>
                <div>
            <button className="save-blog-edit text-light sticky-top" onClick={onSubmit}>Save</button>
            </div>
            </div>
            
        </div>
    )

}

export default EditBlog;