const base_url = `process.env.REACT_APP_BACKEND_URL`;
const TaskList = ({ tasks, setTasks, setUpdate, update }) => {
  return (
    <div>
      <ul>
        {tasks.map(({ text, _id }) => {
          return (
            <li key={_id}>
              {text}
              <span
                onClick={async () => {
                  await fetch(`${base_url}/api/tasks/${_id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                      'Content-Type': 'application/json',
                    }),
                  })
                    .then((data) => data.json())
                    .then((response) => {
                      console.log(response);
                      const deleted_task_id = response.id;
                      /**
                       * FILTER FUNCTION
                       * RETURNS AN ARRAY
                       * [{ age : 18} , { age : 19} , { age : 21}].filter((obj) =>{})
                       */
                      const new_tasks = tasks.filter((task) => task._id !== deleted_task_id);
                      setTasks(new_tasks);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Delete
              </span>
              <span
                onClick={() => {
                  // console.log(`first`)
                  // update function comes here
                  // pass text and id => App.js
                  setUpdate({
                    _id,
                    text,
                  });
                  console.log(`Update text start`);
                  console.log(update);
                  console.log(`Update text`);
                }}
              >
                Update
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
