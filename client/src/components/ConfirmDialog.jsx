import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmDialog = ({ open, handleYes, handleClose, isProposal }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        sx={{
          //You can copy the code below in your theme
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.1)", // Try to remove this to see the result
          },
        }}
        PaperProps={{
          sx: {
            boxShadow: 8,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this ${
            isProposal ? "proposal" : "project"
          }?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
