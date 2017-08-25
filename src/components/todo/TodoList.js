import React from 'react'
import {TodoItem} from './TodoItem'

export const TodoList = (props) => {
	return (
     <div className="Todo-List">
      {props.todos.map(todo =><TodoItem handleToggle={props.handleToggle} key ={todo.id} {...todo} 
      	handleRemove={props.handleRemove}/>)}
       </div>
	)
}

TodoList.propTypes = {
	todos : React.PropTypes.array.isRequired
}