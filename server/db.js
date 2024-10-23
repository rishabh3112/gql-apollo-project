import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const DB_PATH = resolve(process.cwd(), "./db.json");

const getTasks = () => {
  return JSON.parse(readFileSync(DB_PATH, { encoding: "utf-8" }));
};

const writeTasks = (tasks) => {
  writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
};

export const addTask = (task) => {
  const tasks = getTasks();
  writeTasks([...tasks, { ...task, id: randomUUID(), completed: false }]);
  return true;
};

export const readTaskById = (id) => {
  const tasks = getTasks();
  return tasks.find((task) => task.id === id);
};

export const getPaginatedTasks = (page, size) => {
  const offset = page * size;
  return getTasks().slice(offset, offset + size);
};

export const updateTaskById = (id, taskDTO) => {
  const currentTasks = getTasks();
  const task = currentTasks.find((task) => task.id === id);

  if (!task) {
    throw new Error("No Task!");
  }

  const updatedTasks = currentTasks.map((task) => {
    if (task.id !== id) return task;
    return { ...task, ...taskDTO, id };
  });
  writeTasks(updatedTasks);
  return true;
};

export const removeTask = (id) => {
  const currentTasks = getTasks();
  const task = currentTasks.find((task) => task.id === id);

  if (!task) {
    throw new Error("No Task!");
  }

  writeFileSync(currentTasks.filter((task) => task.id !== id));
  return task;
};
