import { Button, IconButton, Snackbar } from "@mui/material";
import { Close } from '@mui/icons-material'
import React from "react";

const SnackTop = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button
        onClick={handleClick({
          vertical: "top",
          horizontal: "center",
        })}
      >
        Top-Center
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="signed in successfully"
        key={vertical + horizontal}
        action={action}
      />
    </div>
  );
};

export default SnackTop;
