import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TaskCard from "./TaskCard";
import TaskInput from "./TaskInput";
import Task from "../types/Task";
import {
  saveTask,
  completeTask,
  restoreTask,
  deleteTask,
} from "../localStorage";

interface ListProps {
  title: string;
  toDo: boolean;
  tasks: Task[] | undefined;
  renderParent: () => void;
}

export default function List({ title, tasks, toDo, renderParent }: ListProps) {
  const [open, setOpen] = useState(false);
  const [stateTasks, setStateTasks] = useState<Task[]>(tasks ?? []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update stateTasks whenever tasks prop changes
  useEffect(() => {
    setStateTasks(tasks ?? []);
  }, [tasks]);

  function createTask(task: Task) {
    setStateTasks([...stateTasks, task]);
    saveTask(task);
  }

  function handleComplete(task: Task, index: number) {
    task.complete = true;
    stateTasks.splice(index, 1);
    setStateTasks([...stateTasks]);
    completeTask(task);
    renderParent();
  }

  function handleRestore(task: Task, index: number) {
    task.complete = false;
    stateTasks.splice(index, 1);
    setStateTasks([...stateTasks]);
    restoreTask(task);
    renderParent();
  }

  function handleDelete(task: Task, index: number) {
    stateTasks.splice(index, 1);
    setStateTasks([...stateTasks]);
    deleteTask(task);
    renderParent();
  }

  return (
    <Stack spacing={1}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      {toDo && (
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleOpen}>
            Create Task
          </Button>
        </Stack>
      )}
      <TaskInput open={open} handleClose={handleClose} onSave={createTask} />
      {stateTasks?.map((t: Task, i) => (
        <TaskCard
          key={t.id}
          task={t}
          handleComplete={() => handleComplete(t, i)}
          handleRestore={() => handleRestore(t, i)}
          handleDelete={() => handleDelete(t, i)}
        />
      ))}
    </Stack>
  );
}
