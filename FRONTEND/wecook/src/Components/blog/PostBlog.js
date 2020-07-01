import React, { useState, useEffect } from 'react'
import update from 'react-addons-update'
import BlogAPI from '../../api/blog'
import UserAPI from '../../api/user'
import ImageUpload from './ImageUpload'
import PictureWall from './Upload'
import { Redirect } from 'react-router-dom'
import { Button, notification, Space, Select, message } from 'antd';
import { GlobalOutlined, LockOutlined, CameraOutlined } from '@ant-design/icons';


const PATH_UPLOAD = 'imagesUpload/'

function PostBlog(props) {

    const [headBlog, setHeadBlog] = useState({ privicy: true, title: '', raw: '' })
    const [guideSteps, setGuideSteps] = useState([{ step: 1, guide: '', images: [] }])
    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    const [imageActive, setImageActive] = useState(null)
    const [user, setUser] = useState(null)
    const [goStraight, setGoStraight] = useState(false)
    useEffect(() => {
        if (user == null) {
            setUser({ ...UserAPI.getCurrentUser() })
        }
    }, [])


    const onChange = (event) => {
        const { name, value } = event.target
        setHeadBlog({ ...headBlog, [name]: value })
    }

    const onClickAddStep = () => {
        setGuideSteps([...guideSteps, { step: guideSteps.length + 1, image: [] }])
    }

    const renderStep = () => {
        return (
            <div>
                {guideSteps.map((guideStep, index) => {
                    return genStep(guideStep, index);
                })}
            </div>
        )
    }

    const genStep = (guideStep, index) => {
        return (
            <div>
                <div className="control-group">
                    <div className="form-group floating-label-form-group controls">
                        <p >Step {guideStep.step}:</p>
                        <input type="text" className="form-control-blog" placeholder="Bạn làm bước này thế nào?" name="guide"
                            required data-validation-required-message="làm ơn nhập vào cách làm của bước này."
                            aria-invalid="false"
                            onChange={e => {
                                let val = e.target.value
                                setGuideSteps(
                                    guideSteps.map((item, i) =>
                                        i === index ? { ...item, guide: e.target.value }
                                            : item
                                    ))
                            }} />
                        <p className="help-block text-danger" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10">
                        <PictureWall handleImageList={(files) => {
                            setGuideSteps(
                                guideSteps.map((item, i) =>
                                    i === index ? { ...item, images: [...files] }
                                        : item
                                ))
                        }} />
                    </div>
                </div>
                <hr />
            </div>

        )
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!imageActive) {
            window.scrollTo(0, 0);
            openNotificationWithIcon('error', "hey " + user.name, "bạn quên chưa đặt ảnh đẹp nhất của món ăn lên kìa!")
            return;
        }
        let data = new FormData()
        let blog = {
            userId: user.userId,
            pathImageActive: (String)(PATH_UPLOAD + imageActive.name), // đặt thêm timeStamp vào tên ảnh để tránh trùng lặp tên ảnh
            privicy: headBlog.privicy,
            title: headBlog.title,
            raw: headBlog.raw,
            guideSteps: []
        }
        let imageUploads = []
        guideSteps.forEach(guideStep => {
            let imagePaths = []
            let listImageInThisStep = guideStep.images
            if (listImageInThisStep != null && listImageInThisStep.length > 0) {
                imagePaths = listImageInThisStep.map(image => {
                    imageUploads.push(image.originFileObj)          // đẩy nội dung file gốc vào danh sách file upload để cho vào formData
                    return (PATH_UPLOAD + image.originFileObj.name);
                })
            }
            let guideStepTmp = {
                step: guideStep.step,
                guide: guideStep.guide,
                imagePaths: imagePaths
            }
            blog.guideSteps = [...blog.guideSteps, guideStepTmp]
        });
        for (let k = 0; k < imageUploads.length; k++) {
            data.append('image_' + k, imageUploads[k])
        }
        data.append('image_active', imageActive)
        console.log(data)


        let resBlog = await BlogAPI.postBlog(blog);
        if (resBlog.status) {
            let resImage = await BlogAPI.postImagesBlog(data)
            console.log("response images post: ", resImage)
            message.success('Đăng bài viết thành công!')
            console.log("post success: ", resBlog.data)
            setGoStraight(true)
        }
        else {
            message.error('có lỗi xảy ra.. tôi cũng không biết.. xin thử lại sau')
            console.log(resBlog)
        }


    }

    const getEpochMiliesTime = () => Math.floor(new Date().getTime() / 1000.0);

    const onChangeImageActive = (event) => {
        let image = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageUrl({ url: reader.result })
            setImageActive(image)
        }
        reader.readAsDataURL(image)

    }

    const onDeletePreviewImage = (e) => {
        e.preventDefault()
        setPreviewImageUrl(null)
        setImageActive(null)
    }

    const openNotificationWithIcon = (type, title, descriptions) => {
        notification[type]({
            message: title,
            description: descriptions
        });
    };

    const { Option } = Select;

    return (
        goStraight ?
            <Redirect to={`/users/${user.name}/profile`} />
            :
            <div className="container" style={{ background: '#fafafa' }}>
                <div className="row" style={{ paddingLeft: '135px', paddingBottom: '50px' }}>
                    <div className="col-lg-10" >
                        <div className="container mt-5">
                            <form name="blog" id="contactForm" encType="multipart/form-data">

                                <Select value={headBlog.privicy}
                                     onChange={(value) => setHeadBlog({...headBlog, privicy: value})} style={{ width: 150 }}>
                                    <Option value={true}>
                                    <GlobalOutlined />  Công khai
                                    </Option>
                                    <Option value={false}>
                                    <LockOutlined />  Riêng tư
                                    </Option>
                                </Select>
                                
                                <div className="container mt-3">
                                    <div className="side-blog-img" style={{ marginLeft: '-38px', background: 'rgb(255, 241, 184)' }}>
                                        {
                                            previewImageUrl == null
                                                ? <p style={{ marginTop: '30%' }}>Đặt ảnh món ăn khi bạn đã hoàn thiện ở đây nhé!</p>
                                                : <img className="img-fluid" src={previewImageUrl.url} alt="" />
                                        }
                                        <div className="date-blog-up">
                                            <CameraOutlined className="camera" />
                                            <input type="file" onChange={onChangeImageActive} />
                                        </div>
                                    </div>
                                </div>

                                <div className="control-group mt-5">
                                    <div className="form-group floating-label-form-group controls">
                                        <input type="text" className="form-control-blog" placeholder="Bạn nấu gì hôm nay?" name="title" value={headBlog.title}
                                            onChange={onChange}
                                            required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                        <p className="help-block text-danger" />
                                    </div>
                                </div>
                                <hr />
                                <div className="control-group">
                                    <div class="md-form">
                                        <textarea id="form7"
                                            placeholder="Nguyên liệu cho món ăn của bạn?"
                                            class="md-textarea form-control-blog"
                                            rows="3"
                                            name="raw" value={headBlog.raw}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <hr />

                                {renderStep()}

                                <p className="next-step" onClick={onClickAddStep}>+ Next step</p>

                                <button className="save-blog text-light" onClick={onSubmit}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );


}

export default PostBlog;