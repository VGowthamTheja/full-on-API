import React, { useContext, useEffect, useState } from "react";
import axios from "../../utils/Axios";
import "./style.css";
import DataTable, { formatted_budget } from "./Table";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Delete, Edit } from '@mui/icons-material';
import ModalForm from "../ModalForm";
import { AuthContext } from "../../context/AuthContext";

const MyStyledButton = (props) => (
  <Button
    onClick={props.handleClickOpen}
    variant="text"
    startIcon={<Add />}
    id="add"
    sx={{
      mx: 1,
      padding: "0.45rem 3rem",
      backgroundColor: "lightgray",
      color: "black",
      "&:hover": {
        backgroundColor: "#A8A8A8",
        color: "white",
      },
    }}
  >
    {props.children}
  </Button>
);

const Projects = () => {
  const {projectList, setProjectList} = useContext(AuthContext);
  const [projectModal, setProjectModal] = useState({
    title: "",
    open: false,
    mode: "add",
    id: ""
  });

  const handleClickOpen = (event) => {
    if (event.target.id === "add") {
      setProjectModal({
        ...projectModal,
        title: "Add Project",
        open: true,
        mode: "add",
      });
    } else {
      setProjectModal({
        ...projectModal,
        open: true,
        title: "Edit Project",
        mode: "edit",
        id: event.target.id.split('-')[1],
      });
    }
  };

  const handleClose = () => {
    setProjectModal({ ...projectModal, open: false });
  };

  useEffect(() => {
    const getProjects = async () => {
      const req = await axios.get("/projects");
      setProjectList(req.data.data);
    };
    getProjects();
  }, [setProjectList]);

  const handleDelete = (event) => {
    const id = event.currentTarget.id.split('-').pop();
    const req = axios.delete(`/projects/${id}`)
    console.log('from deletion', req);
    const getProjects = async () => {
      const req = await axios.get("/projects");
      setProjectList(req.data.data);
    };
    getProjects();
  }

  const data = projectList.map((d)=>{
    return {...d, 
      edit: <Edit onClick={handleClickOpen} id={`edit-${d.p_id}`} sx={{':hover':{cursor:'pointer'}}}/>, 
      delete: <Delete onClick={handleDelete} id={`delete-${d.p_id}`} sx={{':hover':{cursor:'pointer'}}} />}
  })

  const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'content', label: 'Content', minWidth: 200 },
    { id: 'budget', label: 'Budget', minWidth: 90, format: value => formatted_budget(value, 'USD') },
    { id: 'manager', label: 'Manager', minWidth: 100 },
    { id: 'edit', label:'', minWidth: 20 },
    { id: 'delete', label:'', minWidth: 20 }
  ];

  return (
    <div className="project-container">
      <ModalForm mode={projectModal} handleClose={handleClose} projectsList={projectList} />
      <div className="table-title">
        <h3>Available Projects</h3>
        <MyStyledButton handleClickOpen={handleClickOpen}>
          new project
        </MyStyledButton>
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Projects;
