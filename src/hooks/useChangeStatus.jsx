import React, { useEffect, useState } from 'react'

export default function useChangeStatus(url) {
    
    const [loading, setLoading] = useState(false);
    

    const changeStatus = async (status,id) => {
        setLoading(true)
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