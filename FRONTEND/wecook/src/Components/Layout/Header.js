import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Avatar, Menu, Dropdown, message, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserAPI from '../../api/user'
import Item from 'antd/lib/list/Item';
function Header(props) {
    const initialShow = {
        showLogin: true,
        showSignup: true,
        showNewDish: false,
        showProfile: false
    }

    const [show, setShow] = useState(initialShow)
    const [user, setUser] = useState({name: '', avatar: null, id: null})

    useEffect(() => {
        const userCrr = UserAPI.getCurrentUser();
        if (userCrr) {
            window.scrollTo(0, 0)
            setShow({
                showLogin: false,
                showSignup: false,
                showNewDish: true,
                showProfile: true
            })
            setUser({
                name: userCrr.name, 
                id: userCrr.id
            })
        }
    }, [])


    const logout = (event) => {
        UserAPI.logout()
        window.scrollTo(0, 0)
        setShow({ ...initialShow })
        // props.history.push("/");
        // window.location.reload();
    }

    const menu = (<Menu>
        <Menu.Item key="1">
            <Link to={`${user.name}/profile`} className="dropdown-item">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
            2nd menu item
        </Menu.Item>
        <Menu.Item key="3" onClick={logout} icon={<UserOutlined />}>
            Log Out
        </Menu.Item>
    </Menu>);


    return (
        <header className="top-navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container">
                    <Link className="navbar-brand decoration-none" to={"/"}>
                        <img src="images/logo2.png" alt="" style={{ width: '150px', height: '60px' }} />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbars-rs-food">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><Link to={"/"} className="nav-link">Trang chủ</Link></li>
                            {show.showLogin && (
                                <li className="nav-item active"><Link to={"/login"} className="nav-link">Đăng nhập</Link></li>
                            )}

                            {show.showSignup && (
                                <li className="nav-item active"><Link to={"/signup"} className="nav-link">Đăng ký</Link></li>
                            )}

                            {show.showNewDish && (
                                <li className="nav-item active"><Link to={"/post-blog"} className="nav-link">Tạo món mới</Link></li>
                            )}

                            <li className="nav-item" style={{ marginLeft: '10px' }}>
                                <input className="nav-link btn btn-primary" type="text" placeholder="Tim kiem" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                            </li>
                        </ul>
                    </div>
                    {show.showProfile && (
                    <div className="collapse navbar-collapse" id="user_area">
                        <ul className="navbar-nav ml-auto">
                            <Dropdown.Button
                            overlay={menu}
                            placement="bottomCenter" 
                            size="large"
                            style={{backgroundColor: '#fa8c16', border: '1px solid #fa8c16', borderRadius: '5px', verticalAlign: 'center'}}
                            icon={<Avatar src="/images/img-03.jpg" size="medium" icon={<UserOutlined />} />}>
                                        Lý Tuấn
                                    </Dropdown.Button>
                        </ul>
                    </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;