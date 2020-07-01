import React, { useState, useEffect } from 'react'
import {Input} from 'antd'
import { Redirect } from 'react-router-dom';
import UserAPI from '../../api/user'
function Signup(props) {

    const initialUser = {
        name: '',
        password: '',
        gender: '',
        birthday: null,
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
                        WECOOK - MẠNG XÃ HỘI ẨM THỰC LỚN NHẤT THẾ GIỚI
                        </h3>
                    <img src="images/img-03.jpg" className="" alt="we cook sign in"></img>
                </div>

            </div>
            <div className="col-lg-1 col-md-1 mx-auto"></div>
            <div className="col-lg-5 col-md-5 mx-auto">
                <form className="container" name="sentMessage" id="contactForm" onSubmit={onSubmit}>

                        <div className="mt-5">
                            <label>Tên</label>
                            <Input type="text" placeholder="Nhập tên..." 
                            name="name" value={user.name} onChange={onChange}></Input>
                            
                        </div>

                        <div className="form-group floating-label-form-group controls">
                            <label>Mật khẩu</label>
                            <Input type="password" placeholder="Nhập mật khẩu..." 
                            name="password" value={user.password} onChange={onChange}></Input>
                            
                        </div>

                    <div className="control-group my-2">
                        <select className="mr-5" value={user.gender} onChange={onChange} name="gender">
                            <option  >giới tính</option>
                            <option value='nam'>Nam</option>
                            <option value='nữ'>Nữ</option>
                        </select>
                        <label htmlFor="birthday">Sinh nhật  </label>
                        <input type="date" id="birthday" name="birthday" value={user.birthday} onChange={onChange} />
                    </div>


                        <div className="form-group floating-label-form-group controls">
                            <label>Email</label>
                            <Input type="email" placeholder="Nhập email.." 
                            name="email" onChange={onChange} value={user.email}></Input>
                        </div>
                        <div className="my-3">
                            <label>Số điện thoại</label>
                            <Input type="text" placeholder="Nhập số điện thoại..." 
                           name="phoneNumber" onChange={onChange} value={user.phoneNumber}></Input>
                        </div >
                        <div className="form-group floating-label-form-group controls">
                            <label>Thành phố bạn sống</label>
                            <Input type="text" placeholder="thành phố..." 
                           name="city" onChange={onChange} value={user.city} ></Input>
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
                    <button type="submit" value="Submit" className="btn btn-primary">Đăng ký ngay</button>
                </form>
            </div>
            <div className="col-lg-1 col-md-1 mx-auto"></div>
        </div>
    )
}

export default Signup;
