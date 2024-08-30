import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

export default function useDeleteTodo(url, setUpdate) {
    
    const [loading, setLoading] = useState(false);
    
    const deleteLocal = (id) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        let idToDelete = 0
        todos.map((item,index) =>{
            if(item.id == id){
                idToDelete = index
            }
        })
        todos.splice(idToDelete, 1)
        localStorage.setItem("todos", JSON.stringify(todos))
        setUpdate(prev => !prev)
    }

    const deleteTodo = async (id) => {
        if(!navigator.onLine){
            deleteLocal(id)
            return
        }
            const auth = getAuth();
            const user = auth.currentUser;
            
            if(!user){
                alert('You have to log in')
                return 
            }
            const token = await user.getIdToken()
        setLoading(true)
        const result = await fetch(url+id,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
      
        if(result.ok){
            deleteLocal(id)
        }
        setLoading(false)

    }
    
  return ({loading, deleteTodo})
}