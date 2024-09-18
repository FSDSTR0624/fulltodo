import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [inputs, setInputs] = useState([]);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    // Fetch tasks from the backend
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => {
        setInputs(data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newInput = {
      title: event.target.title.value,
      description: event.target.description.value,
      dueDate: event.target.dueDate.value,
      status: 'In Progress',
      bgColor: bgColor,
      textColor: textColor,
    };

    // Send the new task to the backend
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInput),
    })
      .then(response => response.json())
      .then(data => {
        setInputs([...inputs, data]);
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });

    event.target.reset();
  };

  const handleDelete = (id) => {
    // Delete the task from the backend
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setInputs(inputs.filter((input) => input.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    // Update the task status in the backend
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setInputs(
          inputs.map((input) =>
            input.id === id ? { ...input, status: updatedTask.status } : input
          )
        );
      })
      .catch(error => {
        console.error('There was an error updating the task status!', error);
      });
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Finished':
        return 'status-finished';
      case 'Cannot be Achieved':
        return 'status-cannot-be-achieved';
      default:
        return '';
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" required />
        </label>
        <label>
          Background Color:
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </label>
        <label>
          Text Color:
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ul className="task-list">
        {inputs.map((input) => (
          <li key={input.id} className="task-item" style={{ backgroundColor: input.bgColor, color: input.textColor }}>
            <h3>{input.title}</h3>
            <p>{input.description}</p>
            <p>{input.dueDate}</p>
            <p className={`status ${getStatusColor(input.status)}`}>{input.status}</p>
            <button
              className="status-button in-progress"
              onClick={() => handleStatusChange(input.id, 'In Progress')}
              disabled={input.status === 'In Progress'}
            >
              In Progress
            </button>
            <button
              className="status-button finished"
              onClick={() => handleStatusChange(input.id, 'Finished')}
              disabled={input.status === 'Finished'}
            >
              Finished
            </button>
            <button
              className="status-button cannot-be-achieved"
              onClick={() => handleStatusChange(input.id, 'Cannot be Achieved')}
              disabled={input.status === 'Cannot be Achieved'}
            >
              Cannot be Achieved
            </button>
            <button className="delete-button" onClick={() => handleDelete(input.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
