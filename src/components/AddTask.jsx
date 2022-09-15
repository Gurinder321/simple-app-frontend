import React from 'react';
const base_url = `http://127.0.0.1:8800`;

const AddTask = ({ setTasks, tasks }) => {
  const AddTaskFunc = async (event) => {
    event.preventDefault();
    //
    const { task } = event.target;
    // console.log(email.value, password.value);
    const body = {
      text: task.value,
    };
    console.log(body.text);
    //
    await fetch(`${base_url}/api/tasks`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((data) => data.json())
      .then((result) => {
        // console.log(result);
        setTasks([...tasks, result]);
        // empty form
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={AddTaskFunc}>
        <input type="text" name="task" placeholder="Task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
