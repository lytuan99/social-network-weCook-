import React, { useState, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {  Redirect } from 'react-router-dom'
import UserAPI from '../../api/user'


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

function Login(props) {


    const [user, setUser] = useState({name: '', password: ''})
    const [status, setStatus] = useState(false)
    const [message, setMessage] = useState(null)

    const onSubmit = (event) => {
        event.preventDefault();
        let userSubmit = JSON.stringify(user);
        UserAPI.login(userSubmit)
        .then(res =>{
            if (res.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(res.data));
              }
            props.history.push(`${res.data.name}/profile`);
            window.location.reload();
        }).catch(err => {
            if(err.response){
                setMessage(err.response.data.message)
                setStatus(false)
            }
            
        })
    }

    

    return (
        <div>
            <div className="login-form">
                <form onSubmit={onSubmit} method="post">
                    <h2 className="text-center">Đăng nhập</h2>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="tên hoặc email..."
                            name="name"
                            required="required" onChange={(e) => setUser({...user, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control" 
                            placeholder="mật khẩu..."
                            name="password"
                            required="required" onChange={(e) => setUser({...user, password: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
                    </div>
                    <div className="clearfix">
                    </div>
                    <p className="text-center"><a href="/signup">Tạo mới tài khoản</a></p>
                </form>
                
            </div>
        </div>
    )
}

export default Login;