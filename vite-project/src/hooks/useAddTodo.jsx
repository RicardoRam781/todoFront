import React, { useEffect, useState } from 'react'

export default function useAddTodo(url) {
    
    const [loading, setLoading] = useState(false);
    

    const postData = async (task) => {
        setLoading(true)
        const result = await fetch(url,{
            method:"POST",
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
    
  return ({loading, postData})
}
