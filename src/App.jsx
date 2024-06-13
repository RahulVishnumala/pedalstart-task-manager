import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import './App.css'

const App =() => {
  const [editIndex,setEditIndex] = useState(null)
  const [right,setRight] = useState(-450)
  const [task,setTask] = useState([])
  const [form,setForm] = useState({
    title:'',
    description:'',
    duedate:''
  })
  
  const handleDrawer = () => {
    setRight(0)
  }

  const handleInput = (e) => {
    const input = e.target
    const value = input.value
    const key = input.name
    setForm({
      ...form,
      [key]: value
    })
  }

  const createTask = (e) => {
    e.preventDefault()
    setTask([
      ...task,
      form
    ])
    setForm({
      title:'',
      description:'',
      duedate:''
    })
    setRight(-450)
  }

  const deleteTask = (index) => {
    const backup = [...task]
    backup.splice(index,1)
    setTask(backup)
  }

  const editTask = (index) => {
    setRight(0)
    setForm(task[index])
    setEditIndex(index)
  }
  const saveTask = (e) => {
    e.preventDefault()
    const backup = [...task]
    backup[editIndex] = form 
    setTask(backup)
    setForm({
      title:'',
      description:'',
      duedate:''
    })
    setEditIndex(null)
    setRight(-450)
  }
  const closeDrawer = () => {
    setRight(-450)
    setForm({
      title:'',
      description:'',
      duedate:''
    })
    setEditIndex(null)
  }
  
  return(
    <div style={{
      background: '#ddd',
      minHeight: '100vh'
    }}>
      <div style={{
        width: '70%',
        background: 'white',
        margin: '32px auto',
        padding: '32px'
      }}>
        <h2 style={{
          padding: 0,
          margin: 0,
          textAlign:'center'
        }}>React CRUD App</h2>

        <button 
          onClick={handleDrawer}
          style={{
            border: 'none',
            background: '#8407ba',
            color:'white',
            padding: '14px 24px',
            borderRadius:'4px',
            margin: '24px 0'
        }}>
          <i className="ri-task-line" style={{marginRight: '8px'}}></i>
          Add Task
          </button>

          <table className='crud-app-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                task.map((item,index)=>(
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.duedate}</td>
                    <td>
                      <div>
                        <button 
                          onClick={()=>editTask(index)}
                          style={{
                            border: 'none',
                            width: 32,
                            height: 32,
                            background: '#07c65d',
                            color: 'white',
                            borderRadius: 4,
                            marginRight: 12
                        }}>
                        <i className="ri-image-edit-line"></i>
                        </button>

                        <button 
                          onClick={()=>deleteTask(index)}
                          style={{
                            border: 'none',
                            width: 32,
                            height: 32,
                            background: 'red',
                            color: 'white',
                            borderRadius: 4
                        }}>
                        <i className="ri-delete-bin-6-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
      </div>
      
      <aside style={{
        position: 'fixed',
        top: 0,
        right: right,
        width: '450px',
        background: 'white',
        height: '100%',
        boxShadow: '0 0 40px rgba(0,0,0,0.2)',
        padding: '32px',
        boxSizing: 'border-box',
        transition: '0.3s'
      }}>
        <button 
          onClick={closeDrawer}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: 18,
            color: '#8407ba',
            position: 'absolute',
            top: 20,
            right: 20
        }}>
          <i className="ri-close-circle-line"></i>
        </button>
        <h1>New Task</h1>
        <form
        onSubmit={editIndex === null ? createTask : saveTask} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24
        }}>
          <input 
            onChange={handleInput}
            value={form.title}
            required name="title" type="text" placeholder="Enter your title here" 
            style={{
            border: '1px solid #ccc',
            padding: 16,
            borderRadius: 4,
          }}/>
          <input 
            onChange={handleInput}
            value={form.description}
            required name="description" type="text" placeholder="Enter your description" 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 4
          }}/>
          
          <input 
            onChange={handleInput}
            value={form.duedate}
            required name="duedate" type="date" 
            style={{
              border: '1px solid #ccc',
              padding: 16,
              borderRadius: 4
          }}/>
          {
            editIndex === null ?
          
          <button
            style={{
              border: 'none',
              background: '#8407ba',
              fontSize: 18,
              color: 'white',
              padding: '14px 0',
              borderRadius: 4
          }}>Submit</button>
            :
          <button
            style={{
              border: 'none',
              background: 'deeppink',
              fontSize: 18,
              color: 'white',
              padding: '14px 0',
              borderRadius: 4
          }}>Save</button>
        }
        </form>
      </aside>
    </div>
  )
}

export default App;
