import { useState ,  useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  
  
  const saveToLS = (params) =>{ 
    localStorage.setItem("todos" , JSON.stringify(todos));
    
  }
  

  const handleEdit = (e, id)=>{

    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS();
   
  }
  const handleDelete = (e , id)=>{
   
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
     setTodos(newTodos)
     saveToLS();
  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4() , todo, isCompleted: false}]);
    setTodo("")
    saveToLS();

  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id =  e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
  }
  return (
    <>
    <Navbar/>
    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2'>
      <div className='addTodo my-5'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full'/>
        <button onClick={handleAdd} disabled = {todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Add</button>
      </div>
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className='todos'>
        {todos.map(item=>{
        return <div key={item.id} className="todo flex md:w-full justify-between my-3 break-all">
          <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
          <div className={item.isCompleted?"line-through":""}>{item.todo} </div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e , item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
          </div>
        </div>
})}
      </div>
    </div>
    </>
  )
}

export default App
