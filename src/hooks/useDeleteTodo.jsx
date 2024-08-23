import React, { useEffect, useState } from 'react'

export default function useDeleteTodo(url) {
    
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
    }

    const deleteTodo = async (id) => {
        if(!navigator.onLine){
            deleteLocal(id)
            return
        }
        setLoading(true)
        const result = await fetch(url+id,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        setLoading(false)

    }
    
  return ({loading, deleteTodo})
}