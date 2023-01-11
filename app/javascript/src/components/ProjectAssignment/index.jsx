import { PersonPinCircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/Axios";

const ProjectAssignment = () => {
  const { projectList, setSnackOpen } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [assigneeList, setAssigneeList] = useState([]);
  const [assignData, setAssignData] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleAssign = (p_id) => {
    setOpen(true);
    setAssignData(p_id);
  };
  const handleListItemClick = (id) => {
    const postProjectAssignment = async () => {
      const req = await axios.post(
        `projects/user/${id}/assign`,
        {
          project: {
            id: assignData,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (req.data.message) {
        setSnackOpen({
          flag: true,
          message: req.data.message
        })
      }
    };
    postProjectAssignment();
    handleClose();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const req = await axios.get("/api/v1/data/users_display");
      setAssigneeList(req.data.data);
    };
    fetchUsers();
  }, []);

  return (
    <Paper sx={{ maxHeight: "68vh", overflow: "auto" }}>
      <Dialog sx={{ padding: "2rem" }} onClose={handleClose} open={open}>
        <DialogTitle>Assign Project To:</DialogTitle>
        <List sx={{ pt: 0 }}>
          {assigneeList?.map((assignee) => (
            <ListItem
              onClick={() => handleListItemClick(assignee.id)}
              key={assignee.id}
              disableGutters
            >
              <ListItemButton key={assignee.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#888888", color: "white" }}>
                    <PersonPinCircleOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={assignee.user_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      {projectList.map((project) => {
        return (
          <Card
            key={`assign-${project.p_id}`}
            id={`assign-${project.p_id}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.1rem",
              margin: "0.6rem 0rem",
              border: "2px solid gray",
              boxShadow: "5px 6px #888888",
            }}
          >
            <b>{project.title}</b>
            <Button
              variant="contained"
              onClick={() => handleAssign(project.p_id)}
            >
              assign
            </Button>
          </Card>
        );
      })}
    </Paper>
  );
};

export default ProjectAssignment;
