import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "./components/List";
import Task from "./types/Task";
import { getToDoTasks } from "./localStorage";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [refresh, setRefresh] = useState(false);
  const toDoTasks: Task[] | null = getToDoTasks();
  const inProgressTasks = toDoTasks?.filter((t) => t.complete === false);
  const completeTasks = toDoTasks?.filter((t) => t.complete === true);

  function handleRender() {
    setRefresh(!refresh);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <List
            title="Task List"
            toDo={true}
            tasks={inProgressTasks}
            renderParent={handleRender}
          />
        </Paper>
        {completeTasks && (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            {
              <List
                title="Done"
                toDo={false}
                tasks={completeTasks}
                renderParent={handleRender}
              />
            }
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
