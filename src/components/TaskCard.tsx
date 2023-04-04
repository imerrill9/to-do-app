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
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        {complete ? (
          <>
            <Button onClick={handleRestore}>Restore</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        ) : (
          <>
            <Button onClick={handleComplete}>Complete</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
