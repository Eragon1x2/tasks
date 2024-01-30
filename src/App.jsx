import { useEffect, useRef, useState } from 'react'
import './App.css'
import shortid from 'shortid';
import icon from './assets/no-projects.png';
import task from './assets/goal.png';
const tasks = [{id: 1,title: 'Learn React', text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore dolor harum commodi, vel corporis nostrum possimus voluptatem, exercitationem perspiciatis labore quo quaerat provident nesciunt, hic officiis at amet distinctio ipsam?', date: 'aaa', tasks:[]}]
const gg = JSON.parse(localStorage.getItem('titles')) || [];
function App() {
  const [titles, setTitles] = useState(gg);
  const [title, setTitle] = useState(null);
  const taskRef = useRef();
  const titleRef = useRef();
  const textRef = useRef();
  const dateRef = useRef();
  const onAddNewTitle = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;
    const date = dateRef.current.value;
    setTitles(prevState => [...prevState, {title, text, date, id: shortid.generate(), tasks: []}])
  }
  const deleteProject = (id) => {
    setTitles(prevState => prevState.filter(a => a.id !== id))
    setTitle(null)
    // localStorage.setItem('titles', JSON.stringify(titles));
  }
  const searchTitle = (id) => {
    const item = titles.filter(a => a.id === id)
    setTitle(...item);
  }
  useEffect(() => {
    localStorage.setItem('titles', JSON.stringify(titles));
  },[titles])
  const addTask = (e,id) => {
    e.preventDefault();
    setTitles(titles.map((a) => {
      if(a.id === id) {
        a.tasks.push({id: shortid.generate(), value: taskRef.current.value})
        return {...a}
      }
      return a;
    }))
  }
  const deleteTask = (idElem, idTask) => {
    
    setTitles(titles.map((a) => {
      if(a.id === idElem) {
        const gg = a.tasks.filter(e => e.id !== idTask)
        setTitle({...a, tasks: gg})
        return {...a, tasks: gg}
      }
      return a;
    }))

      }
  return (
    <>
      <div className='sidebar'>
        <h1>Your Projects</h1>
        <button onClick={() => setTitle(null)}>Add Project</button>
        <ul>
        {titles && titles.map(title => (<li onClick={() =>searchTitle(title.id)} key={title.id}>
          {title.title}
        </li>))}
        </ul>
      </div>
       {title ? <div className='title_items'>
        <h1><span><img src={task} alt="" /></span>{title.title}</h1>
        <p>Description: {title.text}</p>
        <p>Date: {title.date}</p>
        <p>Tasks</p>
       <form action="" onSubmit={(e) => addTask(e,title.id)}>
       <input type="text" ref={taskRef} placeholder='Add task' /> 
        <button type='submit' className='button-add'>Add task</button>
       </form>
       <button onClick={() => deleteProject(title.id)} className='delete-project'>Delete Project</button>
        <ul>{title.tasks && title.tasks.map(a => (<li key={a.id}>{a.value}<button onClick={() =>deleteTask(title.id, a.id)} className='button-add'>delete</button></li>))}</ul>
</div> : <div className='add_new_project'>
  <h1><span><img src={icon} alt="" /></span>Add new Project</h1>
<form action="" onSubmit={onAddNewTitle}>
        <input type="text" name="namername" ref={titleRef} placeholder="Type title"/>
        <input type="date" name="namername" ref={dateRef} placeholder="Type data"/> 
        <input type="text" name="namername" ref={textRef} placeholder="Type text"/>
        <button type='submit'>Submit</button>
       </form></div>}
    </>
  )
}

export default App
