import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Task from "../types/Task";

interface TaskCardProps {
  task: Task;
  handleComplete: () => void;
  handleRestore: () => void;
  handleDelete: () => void;
}

export default function TaskCard({
  task: { description, complete },
  handleComplete,
  handleRestore,
  handleDelete,
}: TaskCardProps) {
  function TaskButtons() {
    if (complete) {
      return (
        <>
          <Button onClick={handleRestore}>Restore</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={handleComplete}>Complete</Button>
      </>
    );
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <TaskButtons />
      </CardActions>
    </Card>
  );
}
