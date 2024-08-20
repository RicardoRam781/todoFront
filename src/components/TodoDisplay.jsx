import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import useFetching from '../hooks/useFetching'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useChangeStatus from '../hooks/useChangeStatus';
import useDeleteTodo from '../hooks/useDeleteTodo';
export default function TodoDisplay({ id, task, editText, getId, status }) {

  const [checked, setChecked] = useState(status)
  const { loading, changeStatus } = useChangeStatus('http://localhost:3000/update/');
  const { loadingDelete, deleteTodo } = useDeleteTodo('http://localhost:3000/delete/')
  useEffect(() => {

  }, [checked])

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
  }


  return (
    <div style={{ display: "flex", justifyContent: "space-between" ,  width:"100%"}}>
      <div>
        <Checkbox checked={checked} onChange={handleCheckChange}>{task}</Checkbox>
      </div>
      <div>
        <EditOutlined style={{margin:10}} onClick={handleEdit} />
        <DeleteOutlined style={{margin:10}}  onClick={handleDelete} />
      </div>


    </div>
  )
}
