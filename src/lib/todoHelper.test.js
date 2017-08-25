import {addTodo,findById,updateTodo,toggleTodo,removeTodo,filterTodos} from './todoHelpers'

	test('addTodo should add the passed todo to the list',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false}
		]

	    const newTodo = {id:3,name :'three',isComplete:false}

		const expected =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]

		const result = addTodo(startTodos,newTodo)

		expect(result).toEqual(expected)
	})

	test('findById should return the expected item from an array',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]

		
		const expected ={id:2,name :'two',isComplete:false}
		const result = findById(2,startTodos)
		expect(result).toEqual(expected)
	})

    test('toggleTodo should toggle the isComplete prop of a todo',()=>{
		const startTodos ={id:2,name :'two',isComplete:false}
		const expected ={id:2,name :'two',isComplete:true}
		
		const result = toggleTodo(startTodos)
		expect(result).toEqual(expected)
	})

	test('toggleTodo should not mutate the original todo',()=>{
		const startTodos ={id:2,name :'two',isComplete:false}
		const expected ={id:2,name :'two',isComplete:true}
		
		const result = toggleTodo(startTodos)
		expect(result).not.toBe(startTodos)
	})


	test('updateTodo should update an item by id',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]

		
		const updatedTodo ={id:2,name :'two',isComplete:true}
		const expectedTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:true},
		{id:3,name :'three',isComplete:false}
		]
		const result = updateTodo(startTodos,updatedTodo)
		expect(result).toEqual(expectedTodos)
	})



	test('updateTodo should not mutate the original array',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]

		
		const updatedTodo ={id:2,name :'two',isComplete:true}
		
		const result = updateTodo(startTodos,updatedTodo)
		expect(result).not.toBe(startTodos)
	})


	test('removeTodo should remove an item by id',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]
        
        const targetId = 2
		
		const expectedTodos =[
		{id:1,name :'one',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]
		
		const result = removeTodo(startTodos,targetId)
		expect(result).toEqual(expectedTodos)
	})

	test('removeTodo should not mutate the original array',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]
        
        const targetId = 2
		
		const expectedTodos =[
		{id:1,name :'one',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]
		
		const result = removeTodo(startTodos,targetId)
		expect(result).not.toBe(startTodos)
	})


	test('filterTodos should return all items for the root route',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]
		
		const result = filterTodos(startTodos,'/')
		expect(result).toEqual(startTodos)
	})
    
    test('filterTodos should return only completed items for the complete route',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:true},
		{id:3,name :'three',isComplete:false}
		]
		
		const expected =[
		{id:2,name :'two',isComplete:true}
		]
		const result = filterTodos(startTodos,'/complete')
		expect(result).toEqual(expected)
	})

	test('filterTodos should return only incompleted items for the active route',()=>{
		const startTodos =[
		{id:1,name :'one',isComplete:false},
		{id:2,name :'two',isComplete:true},
		{id:3,name :'three',isComplete:false}
		]
		
		const expected =[
		{id:1,name :'one',isComplete:false},
		{id:3,name :'three',isComplete:false}
		]

		const result = filterTodos(startTodos,'/active')
		expect(result).toEqual(expected)
	})