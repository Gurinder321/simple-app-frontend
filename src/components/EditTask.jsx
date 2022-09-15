import { useState, useEffect } from 'react';
const base_url = `http://127.0.0.1:8800`;
const Edit = ({ update, setUpdate, getTasks }) => {
  const [update_text, set_update_text] = useState('');
  //   component mounting
  useEffect(() => {
    console.log(update.text);
    console.log(`Update from edit component`);
    console.log(update);
    set_update_text(update.text);
  }, [update]);
  const update_func = async (evt) => {
    evt.preventDefault();
    console.log({
      updateDate: JSON.stringify({
        text: update_text,
      }),
    });
    await fetch(`${base_url}/api/tasks/${update._id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        text: update_text,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        console.log('Response', response);
        getTasks();
        // expect _id and text
        // setUpdate({});
        // setTasks(new_tasks);
      })
      .catch((error) => {
        console.log(`error at update text`, error);
      });
  };
  return (
    <div>
      <form onSubmit={update_func}>
        <input
          type="text"
          value={`${update_text}`}
          onChange={(event) => {
            set_update_text(event.target.value);
          }}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Edit;
