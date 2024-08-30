import React,{useState} from 'react'
import { Form, Button, Input, Tooltip, Spin, Flex, Alert } from "antd";
import {
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';
import ButtonGroup from 'antd/es/button/button-group';
import { signInWithEmailandPass, signInWithGithub, signInWithGoogle } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';


export default function LoginForm() {
  const navigate = useNavigate()
  const [user,setUser] = useState({})
  const [message, setMessage] = useState(false)
  const [err,setErr] = useState('')
  function signUpResolver(token) {
    if (token) {
      setMessage(true)
      setInterval(() => {
        navigate('/')
      },1500)
    } else {
      alert("Something went wrong")
    }
  }
  const handleSubmit = async  () => {
    const {token,usr, message} = await signInWithEmailandPass(user.email,user.password);
    console.log("message",  message)
    if(message){
      setErr(message)
    }
    signUpResolver(token)
  }
  const handleGithub = async () => {
    try {
      const { token, user } = await signInWithGithub()
      signUpResolver(token)
    } catch (err) {
      console.log(err)
    }
  }

  const handleGoogle = async () => {
    try {
      const { token, user } = await signInWithGoogle()
      signUpResolver(token)

    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setUser(prevValue => ({
      ...prevValue,
      [e.target.name]:e.target.value
    }))
    console.log(user)
  }
  return (
    <div style={{ height: "100vh" }}>
      <h3>log in</h3>
     
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
          onChange={handleChange}
          rules={[
            {
              required: true,
              message: 'The password is required', }
          ]}
        >

          <Input name='password' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />

        </Form.Item>
        <Flex justify="center" align="center" >
          <Form.Item>
            <Flex justify="center" align="center">

            <Button icon={<GoogleOutlined />} onClick={handleGoogle}>Sign in with google</Button>
            {/* <Button icon={<GithubOutlined />} onClick={handleGithub}>Sign in with Github</Button> */}
            <Button type="primary" htmlType="submit" style={{width:"15rem"}} >Sign in with email</Button>
            </Flex>
           

           
              
            
          
            
          </Form.Item>


        </Flex>
        {/* <Flex justify="center" align="center">
        <Form.Item>
        <Flex justify="center" align="center">
        <Button type="primary" htmlType="submit" style={{width:"15rem"}} >Sign in</Button>
        </Flex>
          
          
         
        </Form.Item>
        </Flex> */}
        </Form>
        {
        message && <Alert  message="Sign up Success" type="success"></Alert>
       }
       {
        err && <Alert  message={err} type="error"></Alert>
       }
    </div>
  )
}
