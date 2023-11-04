import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./modal.css";
import Modal from "@mui/material/Modal";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  export const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="box">
          Text in a modal Duis mollis, est non commodo luctus, nisi erat
          porttitor ligula.
        </Box>
      </Modal>
    </div>
  );
}
