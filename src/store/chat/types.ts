import { object, string, number, boolean, array, InferType, date } from 'yup'
import { parse, isDate } from 'date-fns'

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

const userChatSchema = object().shape({
  username: string().required(),
  lastMessage: lastMessageSchema.required(),
})

export const initialResponseSchema = userChatSchema
  .shape({
    messages: array().of(messageSchema).required(),
  })
  .camelCase()

export type IMessage = InferType<typeof messageSchema>
export type IUserChat = InferType<typeof userChatSchema>
export type ILastMessage = InferType<typeof lastMessageSchema>
