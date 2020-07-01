import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import CommentAPI from '../../api/comment'
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} style={{backgroundColor: '#d65106', color: 'white'}}>
        bình luận
      </Button>
    </Form.Item>
  </>
);

export default function AutoComment({userAuth, idBlog})  {

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
      rechieveComment()
  }, [])

  const rechieveComment = async () => {
      let res = await CommentAPI.getAllCommentOfBlog(idBlog);
      if(res.data){
        let cmts = await res.data.comments.map((cmt, index) => {
             return {
                author: <h6>{userAuth.name} </h6>,
                avatar: userAuth.avatar ? userAuth.avatar : '/imagesUpload/lytuan.jpg',
                content: <p>{cmt.content}</p>,
                dateTime: cmt.createTime
             }
        })
        setComments(cmts)
      }
  }

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true)
    setTimeout(() => {
    setSubmitting(false)
    setValue('')
    setComments([...comments, {
        author: <h6>{userAuth.name} </h6>,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{value}</p>,
        datetime: moment().fromNow()}])
    }, 1000
    );
  };

  const handleChange = e => {
    setValue(e.target.value)
  };

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
}
