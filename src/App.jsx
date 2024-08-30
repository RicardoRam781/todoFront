import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MainView from "./components/main";
import LoginForm from "./components/loginForm";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import NavBar from "./components/navBar";
import RegisterForm from "./components/RegisterForm";
const { Header } = Layout;


function App() {
 
  
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<MainView />}> </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
