module.exports = {
  initialState: {
    todos: {},
    nextIndex: 1
  },

  createTodo: (state, todoTitle, todoOrder) => {
    let index = state.nextIndex
    tId = "" + index
    newTodo = {
      title: todoTitle,
      completed: false,
      url: "http://localhost:7879/api/" + tId,
      todoId: tId,
      order: todoOrder
    }
    newState = {
      todos: { ...state.todos, [tId]: newTodo },
      nextIndex: index + 1
    }
    return [newState, newTodo]
  },

  updateTodo: (state, existing, todoTitle, todoCompleted, todoOrder) => {
    const updated = {
      ...existing,
      title: withDefault(existing.title, todoTitle),
      completed: withDefault(existing.completed, todoCompleted),
      order: todoOrder
    }

    const newState = {
      ...state,
      todos: { ...state.todos, [existing.todoId]: updated }
    }

    return [newState, updated]
  },

  deleteTodo: (state, todo) => {
    const todos = { ...state.todos }

    delete todos[todo.todoId]
    return { ...state, todos }
  },

  findTodo: (state, tId) => {
    return state.todos[tId]
  },

  stateToList: state => {
    return Object.values(state.todos)
  }
}

withDefault = (def, maybe) => (maybe === null ? def : maybe)
