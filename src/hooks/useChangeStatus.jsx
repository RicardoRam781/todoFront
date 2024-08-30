import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

export default function useChangeStatus(url, setUpdate) {
    
    const [loading, setLoading] = useState(false);
    
    const changeStatusLocal = (status,id) =>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.map((item,index) =>{
            if(item.id == id){
                todos[index].status = status 
                
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos))
        setUpdate(prev => !prev)
    }
    const changeStatus = async (status,id) => {
        setLoading(true)

        if(!navigator.onLine){
            changeStatusLocal(status,id)
            return
        }
            const auth = getAuth();
            const user = auth.currentUser;
            
            if(!user){
                alert('You have to log in')
                return 
            }
            const token = await user.getIdToken()
            const result = await fetch(url+id,{
            method:"PUT",
            body: JSON.stringify({
                status:status
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        })
        if(result.ok){
            changeStatusLocal(status,id)
        }
        setLoading(false)

    }
    
  return ({loading, changeStatus})
}