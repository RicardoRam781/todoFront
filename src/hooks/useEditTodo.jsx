import React, { useEffect, useState } from 'react'

export default function useEditTodo(url) {
    
    const [loading, setLoading] = useState(false);
    
    const editlocal = (task,id) =>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.map((item,index) =>{
            if(item.id == id){
                todos[index].body = task
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos))
       
    }
    const editData = async (task,id) => {
        if(!navigator.onLine){
            editlocal(task,id)
            return
        }
        setLoading(true)
        const result = await fetch(url+id,{
            method:"PUT",
            body: JSON.stringify({
                body:task
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        setLoading(false)

    }
    
  return ({loading, editData})
}