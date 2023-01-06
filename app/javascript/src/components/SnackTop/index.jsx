import { Button, IconButton, Snackbar } from "@mui/material";
import { Close } from '@mui/icons-material'
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SnackTop = () => {
  const { snackOpen, setSnackOpen } = useContext(AuthContext);

  const handleClose = () => {
    setSnackOpen({flag: false, message: ''});
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen.flag}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackOpen.message}
        key={'topbottom'}
        action={action}
      />
    </div>
  );
};

export default SnackTop;
