import React, { useEffect, useState } from 'react'

export default function useChangeStatus(url) {
    
    const [loading, setLoading] = useState(false);
    
    const changeStatusLocal = (status,id) =>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.map((item,index) =>{
            if(item.id == id){
                todos[index].status = status 
                
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    const changeStatus = async (status,id) => {
        setLoading(true)

        if(!navigator.onLine){
            changeStatusLocal(status,id)
            return
        }
        const result = await fetch(url+id,{
            method:"PUT",
            body: JSON.stringify({
                status:status
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        setLoading(false)

    }
    
  return ({loading, changeStatus})
}