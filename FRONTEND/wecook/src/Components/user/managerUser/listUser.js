import React, {useEffect, useState} from 'react'
import { Table, Tag, Space } from 'antd';
import UserAPI from '../../../api/user'
export default function ListUser() {

    
    const [userList, setUserList] = useState([])
    const [countUser, setCountUser] = useState(Number)

    useEffect(() => {
        rechieveUsers()
        rechieveAmountUser()
    }, [])

    const rechieveUsers = async () => {
        let res = await UserAPI.getAllUser();
        console.log(res.data)
        if(res.data)
            setUserList(res.data.users);
        else
            console.log("errr: ", res)
    }

    const rechieveAmountUser = async () =>{
        let res = await UserAPI.countUser()
        if(res.data)
            setCountUser(res.data.count)
        else
            console.log(res)
    }

    const columns = [
        {
            width: 100,
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: avatar => avatar ? <img src={"/" + avatar} width="100%"></img> 
                                    : <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" width="100%"></img>,
          },
        {
          title: 'Tên',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'giới tính',
          dataIndex: 'gender',
          key: 'gender',
        },
        
        {
            title: 'thành phố',
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
          },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Delete</a>
            </Space>
          ),
        },
      ];

      return (
          <div className="container">
              <h4>Tổng số người dùng: {countUser}</h4>
                <Table columns={columns} dataSource={userList} />   
          </div>
        
      )
}
