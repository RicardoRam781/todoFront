import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { LogOut } from '../../firebaseConfig';

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { Header } = Layout;

    const items = [{ key:1, label:"Home", path:"/"},{key:2, label:"Log in", path:"/login"},{key:3, label:"Sign up", path:"/signUp"}, localStorage.getItem('tkn') ? {key:4,label:"Log out",path:"/login"} : {}]
    const getKeyByPath = (path) =>{
      const key = items.find(item => item.path == path)
   
      if(key){
        return key.key
      }
      
    }
  const handleMenuClick = async (e) => {

    const item = items.find(i => i.key == e.key);
    if(item.key == 4){
      await LogOut()
     

    }
    if (item) {
      navigate(item.path);
    }
    
  };
  return (
    <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          selectedKeys={[(getKeyByPath(location.pathname))?.toString()]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
          
        />
      </Header>
  )
}
