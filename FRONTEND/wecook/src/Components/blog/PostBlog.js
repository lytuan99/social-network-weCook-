import React, { Component } from 'react'

export default class PostBlog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            countStep: 1,
            title: '',
            raw: '',
            guideSteps: [{step: 1, guide: ''}],
        }
    }

    onClickStep = () => {
   
        this.setState(prevState => ({
            countStep: prevState.countStep + 1,
            guideSteps: [...prevState.guideSteps, { step: prevState.countStep + 1, guide: '' }]
          }))
    }


    renderStep = () => {
        return (<div>
            { this.state.guideSteps.map((guideStep, index)=>{
                    return this.genStep(guideStep, index);
            })}

        </div>)
    }


    onChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }



   onSubmit = () =>{
       console.log(this.state)
   }

    genStep = (guideStep, index) => {
            return( <div>
            <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                    <p >Step {guideStep.step}:</p>
                    <input type="text" className="form-control-blog" placeholder="how do you do in this step?" name="guide"
                    value={guideStep.guide}
                     required data-validation-required-message="Please enter your name." aria-invalid="false" />
                    <p className="help-block text-danger" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-1" className="inputfile inputfile-1" data-multiple-caption="file selected" />
                        <label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Add a image</span></label>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-2"  className="inputfile inputfile-1" data-multiple-caption="file selected" />
                        <label htmlFor="file-2"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Add a image</span></label>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="box">
                        <input type="file" name="file-3" className="inputfile inputfile-1" data-multiple-caption="file selected" />
                        <label htmlFor="file-3"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={17} viewBox="0 0 20 17">
                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                        </svg>
                            <span>Add a image</span></label>
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
                            <form name="blog" id="contactForm" noValidate>
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <input type="text" className="form-control-blog" placeholder="what dish do you cook today?" name="title" value={this.state.title}
                                        onChange={this.onChange}
                                        required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                        <p className="help-block text-danger" />
                                    </div>
                                </div>
                                <hr />
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls">
                                        <input type="text" className="form-control-blog" placeholder="raw" name="raw" value={this.state.raw}
                                        onChange={this.onChange}
                                         required data-validation-required-message="Please enter your name." aria-invalid="false" />
                                        <p className="help-block text-danger" />
                                    </div>
                                </div>
                                <hr />

                        {this.renderStep()}
                        <p className="next-step" onClick={this.onClickStep}>+ Next step</p>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <button type="submit" className="save-blog text-light" onSubmit={this.onSubmit} >Save</button>
                    </div>
                </div>
            </div>
        );
    }
}
