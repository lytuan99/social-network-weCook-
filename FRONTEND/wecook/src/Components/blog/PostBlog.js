import React, { useState, useEffect } from 'react'
import update from 'react-addons-update'
import BlogAPI from '../../api/blog'
import UserAPI from '../../api/user'
import ImageUpload from './ImageUpload'
import PictureWall from './Upload'
import { Redirect } from 'react-router-dom'
import { Button, notification, Space, message} from 'antd';
const PATH_UPLOAD = 'imagesUpload/'

function PostBlog(props) {

    const [headBlog, setHeadBlog] = useState({ privicy: true, title: '', raw: '' })
    const [guideSteps, setGuideSteps] = useState([{ step: 1, guide: '', images: [] }])
    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    const [imageActive, setImageActive] = useState(null)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if(user == null){
            setUser({...UserAPI.getCurrentUser()})
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

    const onSubmit = (event) => {
        event.preventDefault();
        if(!imageActive){
            window.scrollTo(0, 0);
            openNotificationWithIcon('error',"hey " + user.name, "bạn quên chưa đặt ảnh đẹp nhất của món ăn lên kìa!" )
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
            console.log(listImageInThisStep)
            if (listImageInThisStep.length > 0) {
                imagePaths = listImageInThisStep.map(image => {
                // let timestamp = getEpochMiliesTime()
                // let newNameImage = ( timestamp + image.originFileObj.name)
                // image.originFileObj = {...image.originFileObj, name: newNameImage}
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
        
        console.log("blog: ", blog)
        console.log("images: ", imageUploads)
        for (let k = 0; k < imageUploads.length; k++) {
            data.append('image_' + k, imageUploads[k])
        }
        data.append('image_active',imageActive)
        data.append('blog', JSON.stringify(blog))
        console.log(data)
        BlogAPI.postBlog(data)
        .then(res =>{
            message.success('Đăng bài viết thành công!')
            console.log("post success: ", res.data)
        }).catch(err => {
            console.log("post error: ", err)
        })

    }

    const getEpochMiliesTime = () => 	Math.floor(new Date().getTime()/1000.0);

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

    const openNotificationWithIcon = (type,title, descriptions) => {
        notification[type]({
          message: title,
          description: descriptions
        });
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10">
                    <div className="container mt-5">
                        <form name="blog" id="contactForm" encType="multipart/form-data">
                            <select className="control-group mb-3" value={headBlog.privicy} name="privicy" onChange={onChange}>
                                <option value={true}>Công khai</option>
                                <option value={false}>Riêng tư</option>
                            </select>
                            <div className="container">
                                {/* <img className="mb-3 fadeIn"
                                        width='100%' src="https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg"></img> */}
                                {
                                    previewImageUrl == null ?
                                        <span className="">
                                            <div className="fileupload text-primary">
                                                <input type="file" onChange={onChangeImageActive} />
                                                Thêm ảnh
                                            </div>
                                        </span>
                                        : <div className="show-image">
                                            <button onClick={onDeletePreviewImage} className="delete btn btn-warning">X</button>
                                            <img className="item-image" src={previewImageUrl.url} width='100%'></img>
                                            
                                        </div>
                                }
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
                                <div className="form-group floating-label-form-group controls">
                                    <input type="text" className="form-control-blog" placeholder="nguyên liệu" name="raw" value={headBlog.raw}
                                        onChange={onChange}
                                        required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                    <p className="help-block text-danger" />
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