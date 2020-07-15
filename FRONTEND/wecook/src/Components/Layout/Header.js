import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory} from 'react-router-dom';
import { Button, Avatar, Menu, Dropdown, message, Tooltip, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserAPI from '../../api/user'
import Item from 'antd/lib/list/Item';
function Header() {
    const initialShow = {
        showLogin: true,
        showSignup: true,
        showNewDish: false,
        showProfile: false,
        showListUser: false
    }
    const [show, setShow] = useState(initialShow)
    const [user, setUser] = useState({name: '', avatar: null, id: null})
    const [searchRedirect, setSearchRedirect] = useState(false)
    const [key, setKey] = useState(null)
    let history = useHistory()
    useEffect(() => {
        const userCrr = UserAPI.getCurrentUser();
        if (userCrr) {
            window.scrollTo(0, 0)
            setShow({
                showLogin: false,
                showSignup: false,
                showNewDish: true,
                showProfile: true,
                showListUser: userCrr.roles.length > 1 ? true : false
            })
            setUser({
                name: userCrr.name, 
                id: userCrr.userId,
                avatar: userCrr.avatar ? userCrr.avatar : null
            })
        }
        
    }, [])


    const logout = (event) => {
        UserAPI.logout()
        window.scrollTo(0, 0)
        setShow({ ...initialShow })
        history.push(`/login`, null);
        // window.location.reload();
    }

    const menu = (<Menu>
        <Menu.Item key="1" style={{background: '#ffe58f'}}>
            <Link to={`/users/${user.name}/profile`} className="dropdown-item" >Profile</Link>
        </Menu.Item>
        <Menu.Item key="3" onClick={logout} icon={<UserOutlined />}>
            Log Out
        </Menu.Item>
    </Menu>);

    const onEnterSearch = (e) => {
        if(e.keyCode == 13){
            setSearchRedirect(true);
            history.push(`/search?key=${key}`, {key: key})
        }
        
    }

    const onChangeSearch = (e) => {
        setKey(e.target.value)
    }




    return (
        
        <header className="top-navbar" style={{background: '#ffbb96'}}>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container">
                    <Link className="navbar-brand decoration-none" to={"/"}>
                        <img src="/images/wecook.png" alt="" style={{ width: '150px' }} />
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
                                <input type="text"
                                className="mySearch"
                                 placeholder="Tìm kiếm"
                                 onKeyDown={onEnterSearch}
                                  onChange={onChangeSearch}
                                  value={key}
                                 />
                            </li>
                        </ul>
                    </div>

                    {show.showListUser && (
                            <span className="nav-item active"><Link to={"/list-user"} className="nav-link">Danh sách người dùng</Link></span>
                        )
                    }
                    {show.showProfile && (
                    <div className="collapse navbar-collapse" id="user_area">
                        <ul className="navbar-nav ml-auto" style={{background: '#ffe58f'}}>
                            <Dropdown.Button
                            overlay={menu}
                            placement="bottomCenter" 
                            size="large"
                            style={{ border: '1px solid #fa8c16', borderRadius: '5px', verticalAlign: 'center'}}
                            icon={<Avatar
                             src={UserAPI.getCurrentUser().avatar ? "/" + UserAPI.getCurrentUser().avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} 
                             size="medium" icon={<UserOutlined />} />}>
                                        {user.name}
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