import React, { useEffect, useState } from 'react'

export default function useDeleteTodo(url) {
    
    const [loading, setLoading] = useState(false);
    

    const deleteTodo = async (id) => {
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