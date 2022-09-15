import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Edit from './components/EditTask';
import { useState, useEffect } from 'react';

function App() {
  const base_url = `http://127.0.0.1:8800`;
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState({}); // task and task_id
  /**
   * DELETE
   * COME FIND TASK WITH DELETED ID : > POP TASK TASK OUT MOF ARRAY : USING FILTER
   */
  const GetTasks = async () => {
    await fetch(`${base_url}/api/tasks`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        setTasks(response);
      })
      .catch((error) => {
        console.log(`Error here : \n ${error}`);
      });
  };
  useEffect(() => {
    GetTasks();
  }, []);
  return (
    <div className="App">
      <TaskList tasks={tasks} setTasks={setTasks} setUpdate={setUpdate} update={update} />
      <AddTask setTasks={setTasks} tasks={tasks} />
      <Edit update={update} setUpdate={setUpdate} getTasks={GetTasks} />
    </div>
  );
}

export default App;
