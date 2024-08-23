import { useEffect, useState } from 'react'

export default function useFetching(url,update) {
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode,setMode] = useState(true)
    

    const getData = async () => {
        setData(null)
        try{
            setLoading(true)
            const result = await fetch(url)
            const dataResult = await result.json()
            localStorage.setItem("todos", JSON.stringify(dataResult))
            
            setData(dataResult)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setMode(false)
            console.log("Something went wrong",err)
            const todos = localStorage.getItem("todos");
            setData(JSON.parse(todos))}
       

    }
    useEffect(() => {
        getData()
    },[url,update])
  return ({data,loading,mode})
}
