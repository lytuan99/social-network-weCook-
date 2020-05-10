import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            status: false,
            message: ''
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userLogin = { name: this.state.name, password: this.state.password };
        // Axios.post('/login', userLogin).then((res) => {
        //     if (!res.status) {
        //         this.setState({ message: res.message })
        //     }
        //     else {
        //         localStorage.setItem('userLogin', JSON.stringify(res.data));
        //         this.setState({
        //             status: true
        //         })
        //         // xử lý redirect đến profile hoặc là đến trang home (lúc này phải xử lý các phân quyền rồi)
        //     }
        // })

        axios({
            method: 'post',
            url: '/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userLogin)
        }).then(res => {
            if (!res.status) {
                this.setState({ message: res.message })
            }
            else {
                localStorage.setItem('userLogin', JSON.stringify(res.data));
                this.setState({
                    status: true
                })
                // xử lý redirect đến profile hoặc là đến trang home (lúc này phải xử lý các phân quyền rồi)
            }
        })

    }

    

    render() {
        if (this.state.status === true)
            return <Redirect to="/home" />
        return (
            <div>
                <div className="login-form">
                    <form onSubmit={this.onSubmit} method="post">
                        <h2 className="text-center">Log in</h2>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message }
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="name or email" name="name" value={this.state.name} required="required" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} required="required" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                            <a href="#" className="pull-right">Forgot Password?</a>
                        </div>
                    </form>
                    <p className="text-center"><a href="/signup">Create an Account</a></p>
                </div>
            </div>
        )
    }
}
