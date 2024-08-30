import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
export default function useAddTodo(url,setUpdate) {
    
    const [loading, setLoading] = useState(false);
    
    const addlocal = (task) =>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos.length <= 0){
            localStorage.setItem("todos", JSON.stringify([{body:task}]))
        } else {
            todos?.unshift({id:todos[0].id + 1, body:task})

            localStorage.setItem("todos", JSON.stringify(todos))
        }
        setUpdate(prev => !prev)
    }
   

    const postData = async (task) => {
        setLoading(true)
        if(!navigator.onLine){
            addlocal(task)
            return
        }
        try{
            const auth = getAuth();
            const user = auth.currentUser;
            
            if(!user){
                alert('You have to log in')
                return 
            }
            const token = await user.getIdToken()
            const result = await fetch(url,{
                method:"POST",
                body: JSON.stringify({
                    body:task
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    
                }
            })
            if(result.ok){
                setLoading(false)
                addlocal(task)
            }
            
            const dataResult = await result.json()
        }catch(err){
            setLoading(false)
            console.log(err)
        }
           
       
        

    }
    
  return ({loading, postData})
}
