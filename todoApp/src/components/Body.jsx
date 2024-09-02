// Body.jsx
import React from 'react'
import TasksList from './TasksList';

export default function Body() {
  return (
    <div className='body'>
        <form action="/upload/task" method='POST'>
            <label>Enter Your Task Here:</label>
            <input type="text" placeholder='Name of your task' id='task-name' name='title' required/>
            <button>Submit</button>
        </form>
        <TasksList></TasksList>
    </div>
  );
}