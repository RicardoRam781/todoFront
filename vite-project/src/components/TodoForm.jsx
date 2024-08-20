import React, { useEffect, useState } from 'react'
import { Form ,Button,Input, Tooltip, Spin} from "antd";
import {PlusOutlined  } from '@ant-design/icons';
import useAddTodo from '../hooks/useAddTodo';
import useEditTodo from '../hooks/useEditTodo';


export default function TodoForm({editText,id}) {
    const {loading, postData} = useAddTodo('http://localhost:3000/add')
    const {loadingEdit, editData} = useEditTodo('http://localhost:3000/update/')
    const [body, setBody] = useState('');

  useEffect(() => {
    console.log("editText received:", editText);
    if (editText) {
      
      setBody(editText);
      
    }
  }, [editText]);

  const handleChange = (e) => {
    setBody(e.target.value);
    console.log("Current body value:", e.target.value);
  };

  const handleSubmit = () => {
    if(editText){
      editData(body,id)
     
    } else {
      postData(body)
    }
  }
  return (
         <Form
    name="basic"
    layout='inline'
    onSubmitCapture={handleSubmit}
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
   
    autoComplete="off"
  >
    <Form.Item
      label="task"
      name="task"
      value={body}
      onChange={handleChange}
      rules={[
        {
          required: true,
          message: 'Please input a task',
          
        },
      ]}
    >
      <span>
      <Input  value={body} onChange={handleChange}/>
      </span>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        span: 16,
      }}
    >
        <Tooltip title="search">
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} iconPosition={'end'}>
        add
      </Button>
      
        </Tooltip>
      
    </Form.Item>
  </Form>
 
   
  )
}
