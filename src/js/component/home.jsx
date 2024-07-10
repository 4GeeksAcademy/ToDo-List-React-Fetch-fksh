import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TaskInput } from "./TaskInput";
import { TaskItem } from "./TaskItem";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      method: "POST",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        bringTasks();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  
  
  const bringTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status == 404) {
          createUser();
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        if (data != undefined) setToDoList(data.todos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    bringTasks();
  }, []);

  const addTask = (taskName) => {
    const newTask = { label: taskName, is_done: false };
    fetch("https://playground.4geeks.com/todo/todos/frankspaceyhelder", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return resp.json();
    })
    .then((addedTask) => {
      setToDoList(prevState => [...prevState, addedTask]);
    })
    .catch((error) => {});
  };

  const deleteTask = (deleteTaskName) => {
    const taskToDelete = toDoList.find((task) => task.label === deleteTaskName);
    if (taskToDelete) {
      fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        if (resp.status !== 204) {
          return resp.json();
        }
      })
      .then(() => {
        setToDoList(prevState => prevState.filter((task) => task.label !== deleteTaskName));
      })
      .catch((error) => {});
    }
  };

  const toggleCheck = (taskName) => {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.label === taskName
          ? {
              ...task,
              is_done: !task.is_done,
            }
          : task
      )
    );
  };

  const cleanAllTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        setToDoList([]);
        createUser();
      })
      .catch((error) => {});
  };

  return (
    <div className="wrapperContainer">
      <Header />
      <TaskInput addTask={addTask} />
      <div className="listItems">
        {toDoList.map((task, key) => (
          <TaskItem
            task={task}
            key={key}
            deleteTask={deleteTask}
            toggleCheck={toggleCheck}
          />
        ))}
      </div>
      {toDoList.length === 0 ? (
        <p className="notify">All done for today!</p>
      ) : null}
      <button className="cleanBtn" onClick={cleanAllTasks}>Clean All Tasks</button>
    </div>
  );
};

export default Home;
