import { useRef } from "react";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Task from "../types/Task";

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

interface TaskInputProps {
  handleClose: () => void;
  onSave: (task: Task) => void;
  open: boolean;
}

export default function TaskInput({
  handleClose,
  onSave,
  open,
}: TaskInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function saveTask() {
    if (inputRef.current && inputRef.current.value) {
      onSave({
        id: nanoid(),
        description: inputRef.current.value,
        complete: false,
      });
    }
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography mb={2}>Enter new Task</Typography>
        <TextField fullWidth inputRef={inputRef}></TextField>
        <Stack direction="row" mt={2}>
          <Button onClick={saveTask}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
