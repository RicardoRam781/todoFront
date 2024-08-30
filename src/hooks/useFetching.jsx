import { useEffect, useState } from 'react'
import { getToken } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';


export default function useFetching(url,update) {
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode,setMode] = useState(true)

    
   
   
    
    const getData = async () => {
        
        
       
     const tnkvalid = localStorage.getItem('tkn')
     setData(null)
        try{  
             if(tnkvalid){
                const result = await fetch(`${url}`,{
                    headers:{
                        'Authorization': `Bearer ${tnkvalid}`
                    }
                })
                const dataResult = await result.json()
                if(dataResult){
                    localStorage.setItem("todos", JSON.stringify(dataResult))
                } else{

                }
                setData(dataResult)
                setLoading(false)
             } else {
                console.log("no token")
             }
        }catch(err){
            setLoading(false)
            setMode(false)
            console.log("Something went wrong",err)
            const todos = localStorage.getItem("todos");
            setData(JSON.parse(todos))}
    }
    useEffect(() =>{
      
        getData();
    },[url,update])
  return ({data,loading,mode})
}
