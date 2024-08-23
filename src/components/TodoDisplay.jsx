import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import useFetching from '../hooks/useFetching'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useChangeStatus from '../hooks/useChangeStatus';
import useDeleteTodo from '../hooks/useDeleteTodo';
export default function TodoDisplay({ id, task, editText, getId, status , setUpdate}) {

  const [checked, setChecked] = useState(status)
  const { loading, changeStatus } = useChangeStatus('https://todoback-production-6ad4.up.railway.app/update/' || 'http://localhost:3000/update/');
  const { loadingDelete, deleteTodo } = useDeleteTodo('https://todoback-production-6ad4.up.railway.app/delete/' || 'http://localhost:3000/delete/')
  useEffect(() => {
console.log() }, [checked])

  const handleCheckChange = () => {
    setChecked(!checked)
    changeStatus(!checked, id)

  }
  const handleEdit = () => {
    editText(task)
    getId(id)
  }
  const handleDelete = () => {
    deleteTodo(id)
    setUpdate(prev => !prev)
  }


  return (
    <div style={{ display: "flex", justifyContent: "space-between" ,  width:"100%" ,boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)", alignItems:"center", background:"white", marginTop:10}}>
      <div style={{padding:"10px"}}>
        <Checkbox checked={checked} onChange={handleCheckChange}>{task}</Checkbox>
      </div>
      <div>
        <EditOutlined style={{margin:10}} onClick={handleEdit} />
        <DeleteOutlined style={{margin:10}}  onClick={handleDelete} />
      </div>


    </div>
  )
}
