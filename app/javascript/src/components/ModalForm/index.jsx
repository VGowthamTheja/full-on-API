import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Slide,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "../../utils/Axios";
import { AuthContext } from "../../context/AuthContext";
import React, { forwardRef, useContext, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalForm = ({ mode, handleClose, projectsList }) => {
  const [managersList, setManagersList] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    content: "",
    budget: "",
    manager: "",
  });
  const { userState, setProjectList } = useContext(AuthContext);

  const handleChange = (event) => {
    setProjectData({
      ...projectData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (mode.mode === "add") {
      const req = await axios.post(
        "/projects",
        {
          project: {
            ...projectData,
          },
        },
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      console.log(req.data);
    } else if (mode.mode === "edit") {
      const req = await axios.patch(
        `/projects/${mode.id}`,
        {
          project: {
            ...projectData,
          },
        },
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );

      console.log("from modal update", req.data);
    }
    const getProjects = async () => {
      const req = await axios.get("/projects");
      setProjectList(req.data.data);
    };
    getProjects();
    handleClose();
  };

  useEffect(() => {
    const setManagerData = async () => {
      const req = await axios.get("/api/v1/data/managers");
      setManagersList(req.data.data);
    };

    const fetchProject = () => {
      console.log(projectsList);
      const project = projectsList.find(
        (project) => project.p_id === Number(mode.id)
      );
      setProjectData({
        ...projectData,
        title: project ? project.title : "",
        content: project ? project.content : "",
        budget: project ? project.budget : "",
        manager: project ? project.u_id : "",
      });
    };

    setManagerData();

    if (mode.mode === "edit") {
      fetchProject();
      console.log(projectData);
    } else if (mode.mode === "add") {
      setProjectData({
        title: "",
        content: "",
        budget: "",
        manager: "",
      });
    }
  }, [mode]);
  return (
    <div>
      <Dialog
        open={mode.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{mode.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Desired actions on the project.
          </DialogContentText>
          <Box dir="column" className="">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Project Title"
                  type="text"
                  name="title"
                  fullWidth
                  value={projectData.title}
                  onChange={handleChange}
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-multiline-static"
                  label="Project Content"
                  multiline
                  name="content"
                  required
                  rows={4}
                  fullWidth
                  value={projectData.content}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Budget"
                  name="budget"
                  fullWidth
                  value={projectData.budget}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel id="demo-simple-select-required-label">
                    Manager
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={projectData.manager}
                    name="manager"
                    label="Manager *"
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem
                      value={userState.user.id}
                      key={`${userState.user.id}`}
                    >
                      Self({userState.user.user_name})
                    </MenuItem>
                    {managersList.map((manager) => {
                      return (
                        <MenuItem value={manager.id} key={`${manager.id}`}>
                          {manager.user_name}({manager.role})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:'gray'}}>cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{backgroundColor:'#0046FF', color:'white'}} >save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalForm;
