import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import {CopyOutlined} from '@ant-design/icons';
import TodoDisplay from './components/TodoDisplay.jsx'
import useFetching from './hooks/useFetching.jsx'

function App() {
  const [online,setOnline] = useState(true)
 
  const [update, setUpdate] = useState(false)
  const {data,loading,mode} = useFetching(process.env.PROD_URL || 'http://localhost:3000/', update)
  const [editText, setEditText] = useState('')
  const [getId, setGetId] = useState(0)

  


   const syncData = async () => {
      console.log("Online mode")
      setOnline(true)
      
      const localData = localStorage.getItem('todos')
      try{
        console.log("try")
        const result = await fetch('http://localhost:3000/syncData',{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
        },
          body:localData
        })

        setUpdate(prev => !prev)
        
        console.log("RESULT",result)

        if(result.status == 201){
          console.log("created")
          
        }
      }catch(err){
        console.log(err)
      }
}
      
      
    
    

  window.addEventListener('online', () => {
    syncData()
    window.location.reload();
  })
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
      {data && data.map(task => (
      <TodoDisplay key={task.id} id={task.id} task={task.body} editText={setEditText} getId={setGetId} status={task.status} setUpdate={setUpdate}></TodoDisplay>  
    ))}
      
        
       </div>
      
      
      
    </div>
  )
}

export default App
