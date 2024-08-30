import React,{useEffect, useState} from 'react'
import { Form, Button, Input, Tooltip, Spin, Flex, message } from "antd";
import {
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';
import {Alert} from "antd"
import { useNavigate } from 'react-router-dom';
import { signUpWithEmailAndPass } from '../../firebaseConfig';

export default function RegisterForm() {

    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [create, setCreated] = useState(false)
    const [msg, setMsg] = useState('')
    const handleChange = (e) => {
        setUser(prevValue => ({
          ...prevValue,
          [e.target.name]:e.target.value
        }))
        console.log(user)
      }

      const handleSubmit = async  () => {
        const created = await signUpWithEmailAndPass(user.email,user.password);
        console.log("create",created)
        if(created?.message == true){
          setCreated(created)
          setInterval(() => {
            navigate('/')
          },2000)
          
        } else {
          setMsg(created?.msg)
        }
      }
      useEffect(() =>{

      },[create])

  return (
    <div style={{height:"100vh"}}>
        <h3>Sign up</h3>
        
        <Form
        name="LoginForm"
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


        autoComplete="off">
        <Form.Item
          label="Email"
          name="Email"
          onChange={handleChange}

          rules={[
            {
              required: true,
              message: 'The email is required',
             },
             {
              type:"email",
              message:"Input a valid email"
             }
          ]}
        >

          <Input name='email' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}  />

        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          type="password"
          onChange={handleChange}
          rules={[
            {
              required: true,
              message: 'The password is required', }
          ]}
        >

          <Input name='password' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />

        </Form.Item>
        <Flex align='center' justify='center'>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:"15rem"}} >Sign Up</Button>
        </Form.Item>
        </Flex>
        
        </Form>
        {
          create && 
          <Alert message="Sign up Success" type="success"></Alert>
        }
        {
          msg && 
          <Alert message={msg} type="error" ></Alert>
        }
    </div>
  )
}
