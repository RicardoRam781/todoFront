import React, { useEffect, useState } from 'react'
export default function useAddTodo(url) {
    
    const [loading, setLoading] = useState(false);
    
    const addlocal = (task) =>{
        const todos = JSON.parse(localStorage.getItem("todos"))

        // localStorage.setItem("addTodo",JSON.stringify({id:todos[0].id + 1, body:task}))
        // navigator.serviceWorker.ready.then((swRegistration ) =>{
        //     console.log("sw register",swRegistration)
        //     swRegistration.sync.register('post-data')
        // }).catch((error) => console.log(error))
        todos.unshift({id:todos[0].id + 1, body:task})
        localStorage.setItem("todos", JSON.stringify(todos))
       
    }
   

    const postData = async (task) => {
        if(!navigator.onLine){
            addlocal(task)
            return
        }
        try{
            const result = await fetch(url,{
                method:"POST",
                body: JSON.stringify({
                    body:task
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            addlocal(task)
            const dataResult = await result.json()
        }catch(err){
            console.log(err)
        }
           
       
        

    }
    
  return ({loading, postData})
}
