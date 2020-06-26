import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserAPI from '../../api/user'
function Signup(props) {

    const initialUser = {
        name: '',
        password: '',
        gender: '',
        birthDay: null,
        email: '',
        phoneNumber: '',
        city: '',
    }
    const [user, setUser] = useState(initialUser)
    const [isSignUp, setIsSignUp] = useState(false)
    const [message, setMessage] = useState(null)
        

    const onChange = (event) => {
        const { value, name } = event.target;
        setUser({...user, [name]: value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let userSubmit = JSON.stringify(user)
        UserAPI.signup(userSubmit)
        .then(res => {
           alert('signUp successful')
        }).catch(err =>{
            console.log("sign up error: ", err)
        })
    }

    return isSignUp ? <Redirect to="/login" /> :
     (
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
                <form className="container" name="sentMessage" id="contactForm" onSubmit={onSubmit}>

                    <div className="control-group">
                        <div className="form-group floating-label-form-group controls">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                 placeholder="Enter name" name="name" value={user.name} onChange={onChange}
                                required data-validation-required-message="Please enter name." />
                            <p className="help-block text-danger" />
                        </div>
                    </div>

                    <div className="control-group">
                        <div className="form-group floating-label-form-group controls">
                            <label>Password</label>
                            <input type="password" className="form-control"
                                 placeholder="Enter password" name="password" value={user.password} onChange={onChange}
                                required data-validation-required-message="Please enter password." aria-invalid="false" />
                            <p className="help-block text-danger" />
                        </div>
                    </div>

                    <div className="control-group my-2">
                        <select className="mr-5" value={user.gender} onChange={onChange} name="gender">
                            <option  >Gender</option>
                            <option value='male'>male</option>
                            <option value='female'>female</option>
                        </select>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday" name="birthday" value={user.birthday} onChange={onChange} />
                    </div>


                    <div className="control-group">
                        <div className="form-group floating-label-form-group controls">
                            <label>Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={onChange} value={user.email}
                                required data-validation-required-message="Please enter email." />
                            <p className="help-block text-danger" />
                        </div>
                    </div>
                    <div className="control-group">
                        <div className="form-group col-xs-12 floating-label-form-group controls">
                            <label>Phone Number</label>
                            <input type="tel" className="form-control"
                                 placeholder="Enter phone number" name="phoneNumber" onChange={onChange} value={user.phoneNumber}
                                required data-validation-required-message="Please enter phone number." />
                            <p className="help-block text-danger" />
                        </div>
                    </div>
                    <div className="control-group">
                        <div className="form-group floating-label-form-group controls">
                            <label>City</label>
                            <input type="text" className="form-control"
                                 placeholder="Enter city where you live" name="city" onChange={onChange} value={user.city} />
                            <p className="help-block text-danger" />
                        </div>
                    </div>
                    <br />
                    {message && (
                        <div className="control-group">
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
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

export default Signup;
