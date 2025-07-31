import { useState, useEffect } from 'react'
import Head from 'next/head'
import { toast } from 'react-hot-toast'
import { TodoItem } from '../types'
import TodoList from '../components/TodoList'
import AddTodoForm from '../components/AddTodoForm'

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading from API/localStorage
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
    toast.success('Todo added successfully!')
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    toast.success('Todo deleted successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Next.js Todo App</title>
        <meta name="description" content="A simple todo app built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Todo App
        </h1>
        <AddTodoForm onAdd={addTodo} />
        {isLoading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </main>
    </div>
  )
}