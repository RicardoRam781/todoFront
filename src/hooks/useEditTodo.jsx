import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

export default function useEditTodo(url, setUpdate) {

    const [loading, setLoading] = useState(false);

    const editlocal = (task, id) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.map((item, index) => {
            if (item.id == id) {
                todos[index].body = task
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos))
        setUpdate(prev => !prev)

    }
    const editData = async (task, id) => {
        if (!navigator.onLine) {
            editlocal(task, id)
            return
        }
        setLoading(true)

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert('You have to log in')
            return
        }
        const token = await user.getIdToken()
        const result = await fetch(url + id, {
            method: "PUT",
            body: JSON.stringify({
                body: task
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        if(result.ok){
           
            editlocal(task, id)
        } 
        setLoading(false)

    }

    return ({ loading, editData })
}