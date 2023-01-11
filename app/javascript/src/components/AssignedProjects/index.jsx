import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import DataTable from '../Projects/Table'
import axios from '../../utils/Axios'

const AssignedProjects = () => {
    const { userState } = useContext(AuthContext);
    const [projects, setProject] = useState([])

    useEffect(()=>{
        const fetchProjects = async () => {
            const req = await axios.get(`/api/v1/data/${userState.user.id}/projects`)
            setProject(req.data.data)
        }
        fetchProjects();
    },[])

    const columns = [
        { id: 'title', label:'Title', minWidth: 150 },
        { id: 'content', label:'Content', minWidth: 200 },
    ]
  return (
    <div>
        <h4>Projects included.</h4>
        <DataTable data={projects} columns={columns} />
    </div>
  )
}

export default AssignedProjects