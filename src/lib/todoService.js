const baseUrl ='http://localhost:8080/todos'


// retrieve data from the server
export const loadTodos = () => {
	return fetch(baseUrl)
	.then(res => res.json())
}

//add new todo to the server
export const createTodo = (todo) =>{
	return fetch(baseUrl,{
		method :'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'

		},
		body : JSON.stringify(todo)
	}).then(res=>res.json())
}

//update todo
export const saveTodo = (todo) =>{
	//concat base url with id using (`:backticks)
	return fetch(`${baseUrl}/${todo.id}`,{
		method :'PUT',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'

		},
		body : JSON.stringify(todo)
	}).then(res=>res.json())
}

export const destroyTodo = (id) =>{
	//concat base url with id using (`:backticks)
	return fetch(`${baseUrl}/${id}`,{
		method :'DELETE',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'

		}
		
	})
}