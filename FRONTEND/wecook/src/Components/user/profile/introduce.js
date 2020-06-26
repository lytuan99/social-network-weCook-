import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';


export default function Introduce({ user }) {

    const [isEdit, setIsEdit] = useState(false)
    const [userIntro, setUserIntro] = useState({
        name: '',
        gender: '',
        birthDay: Date,
        city: '',
        phoneNumber: Number,
        tuna: Number,

    })

    useEffect(() => {
        console.log("what up", user)
        setUserIntro({...user})
    }, [])

    const onClickEdit = (e) => {
        e.preventDefault()
        setIsEdit(true);
    }

    const onClickSave = (e) => {
        e.preventDefault()
        setIsEdit(false)

    }

    const onChangeUserIntro = (e) => {
        const { name, value } = e.target
        setUserIntro({ ...userIntro, [name]: value })
    }


    return (
        <div className="container">
            {!isEdit
                ?
                <div className="row">
                    <div className="col-lg-2">
                        <span className="text-info">giới tính:</span> <span>{userIntro.name}</span>
                        <br />
                        <span className="text-info">ngày sinh:</span> <span>{userIntro.birthDay}</span>
                        <br />
                        <span className="text-info">Thành phố:</span> <span>{userIntro.city}</span>
                    </div>
                    <div className="col-lg-1" />
                    <div className="col-lg-3">
                        <span className="text-info glyphicon glyphicon-phone" /> <span>{userIntro.phoneNumber}</span>
                        <br />
                        <span className="glyphicon glyphicon-envelope text-info mr-2" /> <span>{userIntro.email}</span>
                    </div>
                    <div className="col-lg-1" />
                    <div className="col-lg-2">
                        <span className="text-warning glyphicon glyphicon-piggy-bank" /> <span>Tuna: {userIntro.tuna}</span>
                    </div>
                    <div className="col-lg-1" />
                    <div className="col-lg-2">
                        <Button
                            className="text-primary"
                            icon={<EditOutlined />}
                            onClick={onClickEdit}><span>chỉnh sửa</span></Button>
                    </div>
                </div>

                :
                <form>
                    <div className="row">
                        <div className="col-lg-5">
                            <span className="text-info">giới tính:</span>
                            <input type="text" className="form-control" placeholder="Nhập tên...."
                                onChange={onChangeUserIntro} value={userIntro.gender}
                            />

                            <span className="text-info">Sinh nhật:</span>
                            <input type="date" className="form-control"
                                onChange={onChangeUserIntro} value={userIntro.birthDay} />

                            <span className="text-info">thành phố:</span>
                            <input type="text" className="form-control"
                                onChange={onChangeUserIntro} value={userIntro.city} />

                            <span className="text-info">số điện thoại</span>
                            <input type="text" className="form-control"
                                onChange={onChangeUserIntro} value={userIntro.phoneNumber} />
                            <div className="col-lg-1" />
                            <div className="col-lg-1">

                            </div>
                        </div>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-2 mt-5">
                            <Button
                                className="bg-success text-white"
                                icon={<SaveOutlined />}
                                onClick={onClickSave}><span>Lưu</span></Button></div>
                    </div>
                </form>
            }
        </div>
    )
}
