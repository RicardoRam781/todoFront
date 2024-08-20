import React, { useEffect, useState } from 'react'

export default function useEditTodo(url) {
    
    const [loading, setLoading] = useState(false);
    

    const editData = async (task,id) => {
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
        const dataResult = await result.json()
        setLoading(false)

    }
    
  return ({loading, editData})
}