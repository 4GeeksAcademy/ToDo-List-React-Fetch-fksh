import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TaskInput } from "./TaskInput";
import { TaskItem } from "./TaskItem";

//create your first component
const Home = () => {
  const [toDoList, setToDoList] = useState([]);

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); 
      })
      .then((data) => {
        if (resp.status === 404) {
          fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder"); 
        };
        console.log(data); 
      })
      .catch((error) => {
        
        console.error(error);
      });
  }
  
  const bringTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); 
      })
      .then((data) => {
        console.log(data.todos);
        console.log(data); 
        setToDoList(data.todos) 
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    bringTasks()
  }, [])



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
    .catch((error) => {
      console.error("Error adding task:", error);
    });
  };




  function deleteTask(deleteTaskName) {
    const taskToDelete = toDoList.find((task) => task.taskName === deleteTaskName);
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
        setToDoList(toDoList.filter((task) => task.taskName !== deleteTaskName));
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.error("Task not found");
    }
  }

  function toggleCheck(taskName) {
    setToDoList((prevToDoList) =>
      prevToDoList.map((task) =>
        task.taskName === taskName
          ? {
              ...task,
              checked: !task.checked,
            }
          : task
      )
    );
  }

  const cleanAllTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/frankspaceyhelder", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        setToDoList([]);
      })
      .catch((error) => {
        console.error(error);
      });
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