import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            gender: '',
            birthday: null,
            email: '',
            phoneNumber: '',
            city: '',
            signedUp: false,
            message: []

        }
    }

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name: this.state.name,
            password: this.state.password,
            gender: this.state.gender,
            birthday: this.state.birthday,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city
        };
        axios({
            method: 'post',
            url: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newUser)
        }).then(res => {
            var data = res.data
            if (data.status) {
                this.setState({
                    signedUp: true
                })
            }
            else {
               
                this.setState({
                    signedUp: false,
                    message: data.nameError
                })
            }
        });
    }




    render() {
        const { name, password, gender, birthday, email, phoneNumber, city } = this.state;
        if (this.state.signedUp === true)
            return <Redirect to="/login" />
        return (
            <div className="row">
                <div className="col-lg-5 col-md-5 ml-5">
                    <div className="ml-auto mr-auto">
                        <h3 className="lead mt-5 text-center">
                            weCook - social network largest in the world
                            </h3>
                        <img src="images/img-03.jpg" className="" alt="we cook sign in"></img>
                    </div>

                </div>
                <div className="col-lg-1 col-md-1 mx-auto"></div>
                <div className="col-lg-5 col-md-5 mx-auto">
                    <form className="container" name="sentMessage" id="contactForm" onSubmit={this.onSubmit}>

                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter name" name="name" value={name} onChange={this.onChange}
                                    required data-validation-required-message="Please enter name." />
                                <p className="help-block text-danger" />
                            </div>
                        </div>

                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={this.onChange}
                                    required data-validation-required-message="Please enter password." aria-invalid="false" />
                                <p className="help-block text-danger" />
                            </div>
                        </div>

                        <div className="control-group my-2">
                            <select className="mr-5" value={gender} onChange={this.onChange} name="gender">
                                <option  >Gender</option>
                                <option value='male'>male</option>
                                <option value='female'>female</option>
                            </select>
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" id="birthday" name="birthday" value={birthday} onChange={this.onChange} />
                        </div>


                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls">
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} value={email}
                                    required data-validation-required-message="Please enter email." />
                                <p className="help-block text-danger" />
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="form-group col-xs-12 floating-label-form-group controls">
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" placeholder="Enter phone number" name="phoneNumber" onChange={this.onChange} value={phoneNumber}
                                    required data-validation-required-message="Please enter phone number." />
                                <p className="help-block text-danger" />
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="form-group floating-label-form-group controls">
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="Enter city where you live" name="city" onChange={this.onChange} value={city} />
                                <p className="help-block text-danger" />
                            </div>
                        </div>
                        <br />
                        {this.state.message !== '' && (
                            <div className="control-group">
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            </div>

                        )}
                        <button type="submit" value="Submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col-lg-1 col-md-1 mx-auto"></div>
            </div>

        )
    }
}
