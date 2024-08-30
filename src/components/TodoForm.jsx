import React, { useEffect, useState } from 'react'
import { Form ,Button,Input, Tooltip, Spin} from "antd";
import {PlusOutlined  } from '@ant-design/icons';
import useAddTodo from '../hooks/useAddTodo';
import useEditTodo from '../hooks/useEditTodo';


export default function TodoForm({editText,id,setUpdate, setEditText}) {
    const {loading, postData} = useAddTodo(/*'https://todoback-production-6ad4.up.railway.app/add' ||*/'http://localhost:3000/add',setUpdate)
    const {loadingEdit, editData} = useEditTodo(/*'https://todoback-production-6ad4.up.railway.app/update/' || */'http://localhost:3000/update/',setUpdate)
    const [btnText, setBtnText] = useState('add');
    const [body, setBody] = useState('');
    const tkn = localStorage.getItem('tkn')

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
      
      handleClearValues()
     
    } else {
      postData(body)
      
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
       
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} iconPosition={'end'} disabled={tkn ? false : true} >
        {
          btnText
        }
      </Button>
        <Button danger type='text' disabled={!body} onClick={handleClearValues}>Cancel</Button>
      
       
      
    </Form.Item>
    
  </Form>
 
 
   
  )
}
