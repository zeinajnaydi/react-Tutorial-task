import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm ,TodoList,Footer} from './components/todo'
import {addTodo,generateId,findById,toggleTodo,updateTodo,removeTodo,filterTodos} from './lib/todoHelpers'
import {pipe,partial} from './lib/utils'
import {loadTodos,createTodo,saveTodo,destroyTodo} from './lib/todoService'

class App extends Component {

state = {
    todos: [],
   
    currentTodo :'',
    to:''
   
  }
 componentDidMount() {
    loadTodos()
    .then(todos =>this.setState({todos}))
  }
  
  static contextTypes = {
    route : React.PropTypes.string
  }


//read From db
 

handleRemove = (id,evt) =>{
evt.preventDefault()
const updatedTodos = removeTodo(this.state.todos,id)
this.setState({todos :updatedTodos})

destroyTodo(id)
.then(()=>this.showTempMessage('Todo removed'))
}
  handleToggle = (id) =>{
  // const todo = findById(id,this.state.todos)
  // const toggled = toggleTodo(todo)
  // const updatedTodos = updateTodo(this.state.todos,toggled) 
  // const getUpdatedTodos = pipe(findById,toggleTodo,partial(updateTodo,this.state.todos))
  // const updatedTodos = getUpdatedTodos (id,this.state.todos)



const getToggledTodo = pipe(findById,toggleTodo)
const updated = getToggledTodo (id,this.state.todos)
const getUpdatedTodos = partial(updateTodo,this.state.todos)
const updatedTodos = getUpdatedTodos(updated)

 this.setState({
    todos :updatedTodos
  })

saveTodo(updated)
.then (()=>this.showTempMessage('todo updated'))

 
  }
  
  handleSubmit =(evt) =>{
  evt.preventDefault()
  const newId = generateId()
  const newTodo = {id :newId, name :this.state.currentTodo,isComplete:false}
  const updatedTodos = addTodo(this.state.todos,newTodo)

  
   this.setState ({
     todos :updatedTodos,
     currentTodo:'',
     errorMessage:''
    
   })
// save new todo to the server
   createTodo(newTodo)
   .then(()=>this.showTempMessage('todo added'))
    }


//show temporary message
    showTempMessage = (msg) => {
      this.setState({message:msg})
      setTimeout(()=>this.setState({message:''}),2500)
    }

    handleInputChange=(evt) =>{
    this.setState({
    currentTodo :evt.target.value
    })
    }

    handleEmptySubmit=(evt) =>{
  evt.preventDefault()
this.setState({
  errorMessage :'please enter a name !!'
})
}

 

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos,this.context.route)
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      <div className="Todo-App">
     
      {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
      {this.state.message && <span className='sucess'>{this.state.message}</span>}
     
      <TodoForm handleInputChange = {this.handleInputChange}
      currentTodo = {this.state.currentTodo}
      handleSubmit = {submitHandler}/>
     
     <TodoList handleToggle={this.handleToggle} handleRemove={this.handleRemove} todos={displayTodos}/>
      <Footer />
     

       </div>
    </div>
    );
  }
}

export default App;
