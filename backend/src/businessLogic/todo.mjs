import * as uuid from 'uuid'
import { TodosAccess } from '../dataLayer/todoAccess.mjs'

const todoAccess = new TodosAccess()
const logger = createLogger('TodosAccess')
export const createTodo = async (newTodoData, userId) => {
  const s3_env = process.env.TODOS_S3_BUCKET
  console.log("Env: ", s3_env)
  const todoId = uuid.v4()
  const { name, dueDate } = newTodoData
  logger.info('Process Create Todo Data is called')
  return await todoAccess.createData({
    todoId,
    name: name,
    userId,
    dueDate: dueDate,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: `https://${s3_env}.s3.amazonaws.com/${todoId}`
  })
}

export const updateData = async (updateTodoData, todoId, userId) => {
  const { name, dueDate, done } = updateTodoData
  logger.info('Process Update Todo Data is called')
  return await todoAccess.updateData({
    todoId,
    name: name,
    dueDate: dueDate,
    done: done,
    userId
  })
}

export const deleteData = async (todoId, userId) =>
  await todoAccess.deleteData(todoId, userId)

export const getTodosData = async (userId) =>
  await todoAccess.getListOfTodo(userId)
