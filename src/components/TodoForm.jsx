import React, { useEffect, useState } from 'react'
import { Form ,Button,Input, Tooltip, Spin} from "antd";
import {PlusOutlined  } from '@ant-design/icons';
import useAddTodo from '../hooks/useAddTodo';
import useEditTodo from '../hooks/useEditTodo';


export default function TodoForm({editText,id,setUpdate, setEditText}) {
    const {loading, postData} = useAddTodo('http://localhost:3000/add')
    const {loadingEdit, editData} = useEditTodo('http://localhost:3000/update/')
    const [btnText, setBtnText] = useState('add');
    const [body, setBody] = useState('');

  useEffect(() => {
    if (editText) {
      setBtnText("edit")
      setBody(editText);
    }
  }, [editText]);

  const handleChange = (e) => {
    setBody(e.target.value);
    if(e.target.value  == ''){
      console.log("cleaning")
      handleClearValues()
    }
  };

  

  const handleSubmit = () => {
    console.log("legtn", editText.length)
    if(editText.length > 0){
      editData(body,id)
      setUpdate(prev => !prev)
      handleClearValues()
     
    } else {
      postData(body)
      setUpdate(prev => !prev)
      handleClearValues()
    }
  }

  const handleClearValues = () =>{
    setBody('')
    setEditText('')
    id = 0
    setBtnText('add')
   
  }
  return (
   
         <Form
    name="layout-multiple-horizontal"
    layout='horizontal'
    
    onSubmitCapture={handleSubmit}
    labelCol={{
      span: 3,
    }}
    wrapperCol={{
      span: 18,
    }}
    initialValues={{
      remember: true,
    }}
    
    
    autoComplete="off"
  >
    <Form.Item
      label="Task"
      name="Task"
      value={body}
      onChange={handleChange}
      
      rules={[
        {
          required: true && btnText == 'add',
          message: 'Please input a task',
          

          
        },{
          required: true && btnText == 'edit',
          message:'Please, input text to edit the task'
        }
      ]}
    >
      <span>
      <Input.TextArea  value={body} onChange={handleChange}   style={{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}/>
      </span>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        span: 25,
      }}
      layout='horizontal'
     
    >
       
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} iconPosition={'end'} >
        {
          btnText
        }
      </Button>
        <Button danger type='text' disabled={!body} onClick={handleClearValues}>Cancel</Button>
      
       
      
    </Form.Item>
    
  </Form>
 
 
   
  )
}
