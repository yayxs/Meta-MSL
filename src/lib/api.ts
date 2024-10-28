import { action, cache } from '@solidjs/router'
import { storage } from './db'
import { Todo } from '~/types'
export const addTodo = action(async (formData: FormData) => {
  'use server'
  const title = formData.get('title') as string
  let [{ value: todos }, { value: index }] = await storage.getItems([
    'todos:data',
    'todos:counter'
  ])
  // default value for first write
  todos = todos || []
  index = index || 0

  await Promise.all([
    storage.setItem('todos:data', [
      ...(todos as Todo[]),
      { id: index as number, title, completed: false }
    ]),
    storage.setItem('todos:counter', (index as number) + 1)
  ])
})
