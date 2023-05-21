import { makeAutoObservable } from 'mobx'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  EventType,
  IUserChat,
  IMessage,
  SocketMessage,
  initialResponseSchema,
  messageSchema,
  ILastMessage,
} from './types'
import { array } from 'yup'
import { createContext, useContext } from 'react'
import messaging from '@react-native-firebase/messaging'

export class ChatStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: true })
  }

  messageField = ''
  socket: WebSocket
  messages: Map<string, IMessage[]> = new Map()
  chats: IUserChat[] = []
  username = ''

  private addMessage(message: IMessage, usernameKey: string) {
    const storeMessage = this.messages.get(usernameKey)

    if (!storeMessage) return false

    storeMessage.push(message)

    return true
  }

  setMessageField(value: string) {
    this.messageField = value
  }

  createNewChat(username: string, message: IMessage) {
    this.chats.unshift({
      username,
      lastMessage: { ...message, isMyself: this.isMyself(message.from) },
    })
    this.messages.set(username, [message])
  }

  clear() {
    this.messages.clear()
    this.chats = []
  }

  private handleAuthEvent(data: any[]) {
    if (Array.isArray(data)) {
      const castedMessages = array().of(initialResponseSchema).cast(data)

      if (!castedMessages) return console.log('wrong type', data)

      castedMessages.forEach(({ username, messages, lastMessage }) => {
        const existingChat = this.chats.find(chat => chat.username === username)

        if (!existingChat) {
          this.chats.push({
            username,
            lastMessage,
          })
        }

        if (this.messages.has(username)) return

        this.messages.set(username, messages)
      })
    }
  }

  isMyself(from: string) {
    return this.username === from
  }

  private handleReceiveMessage(data: any) {
    const castedMessage = messageSchema.cast(data)

    const { from, to } = castedMessage

    const isMyself = this.isMyself(from)

    const usernameKey = isMyself ? to : from

    const isAdded = this.addMessage(castedMessage, usernameKey)

    if (isAdded) return this.updateLastMessage(castedMessage, usernameKey)
    //else
    this.createNewChat(usernameKey, {
      ...castedMessage,
      isMyself,
    })
  }

  updateLastMessage(message: IMessage, usernameKey: string) {
    const chat = this.chats.find(elem => elem.username === usernameKey)

    chat!.lastMessage = {
      ...message,
      isMyself: this.isMyself(message.from),
    }

    console.log(JSON.stringify(this.chats, null, 2))
  }

  setUsername(username: string) {
    this.username = username
  }

  sendNewMessage(receiver: string) {
    const data = {
      event: EventType.SEND_MESSAGE,
      data: {
        from: this.username,
        to: receiver,
        message: this.messageField.trim(),
      },
    }

    this.socket.send(JSON.stringify(data))

    this.setMessageField('')
  }

  startSocket() {
    try {
      this.socket = new WebSocket(`${Config.WS_URL}/ws`)

      this.socket.onopen = async () => {
        const token = await AsyncStorage.getItem('token')

        await messaging().registerDeviceForRemoteMessages()

        const fcmToken = await messaging().getToken()

        const authData = {
          event: EventType.AUTH,
          data: {
            token,
            token_device: fcmToken,
          },
        }

        this.socket.send(JSON.stringify(authData))
      }

      this.socket.onclose = () => setTimeout(this.startSocket, 5000)

      this.socket.onmessage = this.socketEventHandler
    } catch (e) {
      console.log('error in startsocket >>> ', e)
    }
  }

  private socketEventHandler(event: WebSocketMessageEvent) {
    const message = JSON.parse(event.data) as SocketMessage

    switch (message.event) {
      case EventType.AUTH: {
        this.handleAuthEvent(message.data)
        break
      }

      case EventType.RECEIVE_MESSAGE: {
        this.handleReceiveMessage(message.data)
        break
      }
    }
  }

  closeSocket() {
    if (!this.socket) return
    this.socket.close()
  }
}

export const counterStore = new ChatStore()

// Create a React Context with the counter store instance.
export const ChatStoreContext = createContext<ChatStore>(counterStore)
export const useChatStore = () => useContext(ChatStoreContext)
