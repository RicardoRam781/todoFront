import { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import {CopyOutlined} from '@ant-design/icons';
import TodoDisplay from './components/TodoDisplay.jsx'
import useFetching from './hooks/useFetching.jsx'
function App() {

  const {data,loading,mode} = useFetching('http://localhost:3000/')
  const [editText, setEditText] = useState('')
  const [getId, setGetId] = useState(0)

  return (
    <div style={{height:"100vh" , background:"gray"}}>
      <div style={{textAlign:"center"}}>
      <h3>To do List <CopyOutlined/></h3>
      </div>
       <TodoForm editText={editText} id={getId}/>
       <div style={{ display:"flex",alignItems:"flex-start", justifyContent:"center", flexDirection:"column", padding:15}}>
       {
        loading &&
        <p>loading...</p> 
        }
        {
          !mode && 
          <p>You are offline, some changes could be not saved...</p>
        }
      {data && data.map(task => (
      <TodoDisplay key={task.id} id={task.id} task={task.body} editText={setEditText} getId={setGetId} status={task.status}></TodoDisplay>  
    ))}
      
        
       </div>
    </div>
  )
}

export default App
