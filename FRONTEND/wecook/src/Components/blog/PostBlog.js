import React, { Component } from 'react'
import update from 'react-addons-update'
import Axios from 'axios';
import ImageUploader from 'react-images-upload';

const PATH_UPLOAD = 'imagesUpload/'
export default class PostBlog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pathImageActive: '',
            privicy: '',
            countStep: 1,
            title: '',
            raw: '',
            guideSteps: [{ step: 1, guide: '' }],
            imageSteps: [{ images: [] }],
            imageActive: null
        }

    }

    onChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onChangeImageActive = (event) => {
        let image = event.target.files[0]
        this.setState({
            pathImageActive: (PATH_UPLOAD + image.name),
            imageActive: image
        })
    }

    onChangeImage = (event, index) => {
        let image = event.target.files[0]
        this.setState(prevState => update(this.state, {
            imageSteps: {
                [index]: { $set: { images: [...prevState.imageSteps[index].images, image] } }
            }
        }))
    }

    onChangeStep = (event, index) => {

        this.setState(update(this.state, {
            guideSteps: {
                [index]: { $set: { step: index + 1, guide: event.target.value } }
            }
        }))
    }

    onClickStep = () => {

        this.setState(prevState => ({
            countStep: prevState.countStep + 1,
            guideSteps: [...prevState.guideSteps, { step: prevState.countStep + 1, guide: '' }]
        }))
    }


    renderStep = () => {
        var guideTmp;
        return (<div>
            {this.state.guideSteps.map((guideStep, index) => {
                return this.genStep(guideStep, index, guideTmp);
            })}

        </div>)
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { imageSteps, guideSteps } = this.state;
        let data = new FormData()

        let blog = {
            pathImageActive: this.state.pathImageActive,
            privicy: this.state.privicy,
            title: this.state.title,
            raw: this.state.raw,
            imageActive: this.state.imageActive,
            guideSteps: []
        }

        let i = 0
        let imageUploads = []

        guideSteps.forEach(guideStep => {
            let imagePaths = []
            if (i < imageSteps.length) {
                let imageTmps = imageSteps[i].images;

                imagePaths = imageTmps.map((image, index, imageTmps) => {       // duyệt từng ảnh của mỗi step để lấy đường dẫn
                    imageUploads.push(image);
                    let path = PATH_UPLOAD + image.name;
                    return path;
                })
            }
            let guideStepTmp = {
                step: guideStep.step,
                guide: guideStep.guide,
                imagePaths: imagePaths
            }
            blog.guideSteps = [...blog.guideSteps, guideStepTmp]
            i++;

        });

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        for (let k = 0; k < imageUploads.length; k++) {
            data.append('image_' + k, imageUploads[k])
        }
            data.append('image_active',this.state.imageActive)
        data.append('blog', JSON.stringify(blog))
        Axios.post('/blogs', data, config)
            .then(res => {
                if (res.data.status === true)
                    alert('post thành công!')
            })
            .catch(error => {
                alert('có lỗi xảy ra!! \n error: ' + error.error)
            });
    }





    genStep = (guideStep, index, guideTmp) => {
        return (<div>
            <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                    <p >Step {guideStep.step}:</p>
                    <input type="text" className="form-control-blog" placeholder="Bạn làm bước này thế nào?" name="guide"
                        value={guideTmp} onChange={(event) => this.onChangeStep(event, index)}
                        required data-validation-required-message="Please enter your name." aria-invalid="false" />
                    <p className="help-block text-danger" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-1" onChange={(event) => this.onChangeImage(event, index)} className="inputfile inputfile-1" />
                        <label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Image</span></label>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-2" onChange={(event) => this.onChangeImage(event, index)} className="inputfile inputfile-1" data-multiple-caption="file selected" />
                        <label htmlFor="file-2"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Image</span></label>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-3" onChange={(event) => this.onChangeImage(event, index)} className="inputfile inputfile-1" data-multiple-caption="file selected" />
                        <label htmlFor="file-3"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Image</span></label>
                    </div>
                </div>
            </div>
            <hr />

        </div>

        )
    }





    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="container mt-5">
                            <form name="blog" id="contactForm" onSubmit={this.onSubmit} encType="multipart/form-data">
                                <select className="control-group mb-3" value={this.state.privicy} name="privicy" onChange={this.onChange}>
                                    <option value="public">Công khai</option>
                                    <option value="private">Riêng tư</option>
                                </select>
                                <div className="col-lg-4">
                                    <div className="box">
                                        <input type="file" name="file-active" onChange={this.onChangeImageActive} className="inputfile inputfile-1" data-multiple-caption="file selected" />
                                        <label htmlFor="file-active"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                                        </svg>
                                            <span>Chọn ảnh hoàn thiện sản phẩm của bạn</span></label>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <input type="text" className="form-control-blog" placeholder="Bạn nấu gì hôm nay?" name="title" value={this.state.title}
                                            onChange={this.onChange}
                                            required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                        <p className="help-block text-danger" />
                                    </div>
                                </div>
                                <hr />
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <input type="text" className="form-control-blog" placeholder="nguyên liệu" name="raw" value={this.state.raw}
                                            onChange={this.onChange}
                                            required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                        <p className="help-block text-danger" />
                                    </div>
                                </div>
                                <hr />

                                {this.renderStep()}
                                <p className="next-step" onClick={this.onClickStep}>+ Next step</p>

                                <button type="submit" className="save-blog text-light" onSubmit={this.onSubmit} >Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
