import { isDate } from 'date-fns'
import { InferType, array, boolean, date, object, string } from 'yup'

function parseDateString(value: any, originalValue: any) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : new Date(originalValue)

  return parsedDate
}

export enum EventType {
  AUTH = 'auth',
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
}

export enum StatusType {
  SUCCESS = 1,
  ERROR = 0,
}

export type SocketMessage = {
  event: EventType
  status: StatusType
  data: any
}

export const messageSchema = object().shape({
  id: string().required(),
  from: string().required(),
  to: string().required(),
  message: string().required(),
  time: date().transform(parseDateString).required(),
})

export const lastMessageSchema = object()
  .shape({
    id: string().required(),
    message: string().required(),
    time: date().transform(parseDateString).required(),
    isMyself: boolean().required(),
  })
  .camelCase()

// const userChatSchema = object().shape({
//   lastMessage: lastMessageSchema.required(),
// })

export const initialResponseSchema = object()
  .shape({
    username: string().required(),
    messages: array().of(messageSchema).required(),
    lastMessage: lastMessageSchema,
  })
  .camelCase()

export type IMessage = InferType<typeof messageSchema>
export type ILastMessage = InferType<typeof lastMessageSchema>
