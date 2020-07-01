import React, {useState, useEffect} from 'react'
import { Card, Avatar, Popover, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import BlogAPI from '../../../api/blog'
import {Link} from 'react-router-dom'
export default function MyBlog({myBlog, user}) {

  
  const [statusPrivicy, setStatus] = useState(myBlog.privicy)

  useEffect(() => {
    
  }, statusPrivicy)

  const changePrivicy = (e) => {
    e.preventDefault()
    BlogAPI.changePrivicy(!myBlog.privicy, myBlog._id)
    .then(res => {
      message.success(res.data)
      setStatus(!statusPrivicy)
    }).catch(err => {
      console.log(err)
    })
  }


  const { Meta } = Card;
  return (
    <Card
      style={{ width: 300, marginRight: '10px' }}
      cover={
        <img
          alt="example"
          src={"/" + myBlog.pathImageActive}
        />
      }
      actions={[
        <Popover
          content={
            statusPrivicy ? 
            <div>
              <strong className="text-primary"><GlobalOutlined /> Công khai</strong>
              <p className="selectPrivicy" onClick={changePrivicy} ><LockOutlined /> Riêng tư</p>
            </div>
            :
            <div>
              <p onClick={changePrivicy} className="selectPrivicy"><GlobalOutlined /> Công khai</p>
              <strong className="text-primary"><LockOutlined /> Riêng tư</strong>
            </div>
          }
          trigger="click"
        >
            <SettingOutlined key="setting" />  
        </Popover>,
        <Link to={`/users/${user.name}/blogs/${myBlog._id}/edit`}>
            <EditOutlined key="edit" />
        </Link>
        ,
        <Popover
          content={
            <div>
              <strong className="deleteBlog">Xóa</strong>
            </div>
          }
          trigger="click"
        >
          <EllipsisOutlined key="ellipsis" />
        </Popover>,
        
      ]}
    >
      <Meta
        title={myBlog.title}
        description={myBlog.raw}
      />
    </Card>
  )
}
