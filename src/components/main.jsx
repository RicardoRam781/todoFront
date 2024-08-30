import { useEffect, useState } from 'react'
import '../App.css'
import TodoForm from './TodoForm.jsx'
import {CopyOutlined} from '@ant-design/icons';
import TodoDisplay from './TodoDisplay.jsx'
import useFetching from '../hooks/useFetching'


function MainView() {
  const [online,setOnline] = useState(true) /*'https://todoback-production-6ad4.up.railway.app' ||*/ 
 
  const [update, setUpdate] = useState(false)
  const [editText, setEditText] = useState('')
  const [getId, setGetId] = useState(0)
  const [token, setToken] = useState(null)
  const {data,loading,mode} = useFetching('https://todoback-production-6ad4.up.railway.app' || 'http://localhost:3000/', update,token)
 


   const syncData = async () => {
      console.log("Online mode")
      setOnline(true)
      
      const localData = localStorage.getItem('todos')
      
      try{
        const token = localStorage.getItem('tkn')
        const result = await fetch('https://todoback-production-6ad4.up.railway.app/syncData'||'http://localhost:3000/syncData',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
          body:localData
        })
        console.log("result",result)
        if(result.status == 201){
          alert('online')
          window.location.reload();
         
  
        }

        setUpdate(prev => !prev)
        
       

        
      }catch(err){
        console.log(err)
      }
}
      
      
    
    

  window.addEventListener('online', () => {
    syncData()
    
  },{once:true})
  window.addEventListener('offline', () => {
    console.log("offline mode")
    setOnline(false)
  })

  
  useEffect(()=>{
 
    console.log("El navegador esta", navigator.onLine)
  },[])
  return (
    
    <div style={{height:"100vh" }}>
      
      
        <div style={{textAlign:"center"}}>
      <h3>To do List <CopyOutlined/></h3>
      </div>
      <div >
      <TodoForm editText={editText} id={getId} setUpdate={setUpdate} setEditText={setEditText}/>
      </div>
      
       <div style={{ display:"flex",alignItems:"flex-start", justifyContent:"center", flexDirection:"column", padding:15}}>
        {
          !online && 
          <p>You are offline, some changes could be not saved...</p>
        }
      {data != null ?  data.map(task => (
      <TodoDisplay key={task.id} id={task.id} task={task.body} editText={setEditText} getId={setGetId} status={task.status} setUpdate={setUpdate}></TodoDisplay> 
     
    )) : <p>You have to LogIn to see your to-do list</p>}
      
        
       </div>
      
      
      
    </div>
  )
}

export default MainView