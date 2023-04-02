import Task from "./types/Task";

export function getToDoTasks(): Task[] | null {
  const tasks: string | null = localStorage.getItem("toDoTasks");
  return tasks ? JSON.parse(tasks) : null;
}

export function saveTask(task: Task): void {
  const tasks: string | null = localStorage.getItem("toDoTasks");
  if (tasks) {
    const parsedTasks = JSON.parse(tasks);
    parsedTasks.push(task);
    const json = JSON.stringify(parsedTasks);
    localStorage.setItem("toDoTasks", json);
  } else {
    const json = JSON.stringify([task]);
    localStorage.setItem("toDoTasks", json);
  }
}

export function completeTask(task: Task): void {
  const tasks: string | null = localStorage.getItem("toDoTasks");
  const parsedTasks = JSON.parse(tasks!);
  const modifiedTask = parsedTasks.find((t: Task) => t.id === task.id);
  modifiedTask.complete = true;
  const json = JSON.stringify(parsedTasks);
  localStorage.setItem("toDoTasks", json);
}

export function restoreTask(task: Task): void {
  const tasks: string | null = localStorage.getItem("toDoTasks");
  const parsedTasks = JSON.parse(tasks!);
  const modifiedTask = parsedTasks.find((t: Task) => t.id === task.id);
  modifiedTask.complete = false;
  const json = JSON.stringify(parsedTasks);
  localStorage.setItem("toDoTasks", json);
}

export function deleteTask(task: Task): void {
  const tasks: string | null = localStorage.getItem("toDoTasks");
  const parsedTasks = JSON.parse(tasks!);
  const deletedIndex = parsedTasks.findIndex((t: Task) => t.id === task.id);
  parsedTasks.splice(deletedIndex, 1);
  const json = JSON.stringify(parsedTasks);
  localStorage.setItem("toDoTasks", json);
}
