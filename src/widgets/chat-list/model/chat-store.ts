import { makeAutoObservable } from 'mobx'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  EventType,
  IMessage,
  SocketMessage,
  initialResponseSchema,
  messageSchema,
  ILastMessage,
} from '../../../entities/chat-list/types'
import { array } from 'yup'
import messaging from '@react-native-firebase/messaging'
import { AppStore } from '@'

export class ChatStore {
  constructor(private app: AppStore) {
    makeAutoObservable(this, {}, { autoBind: true, deep: true })
  }

  messageField = ''
  socket: WebSocket
  messages: Map<string, IMessage[]> = new Map()
  chats: Map<string, ILastMessage> = new Map()
  isSearching: boolean = false

  private addMessage(message: IMessage, usernameKey: string) {
    const storeMessage = this.messages.get(usernameKey)

    if (!storeMessage) return false

    storeMessage.push(message)

    return true
  }

  toggleIsSearching() {
    this.isSearching = !this.isSearching
  }

  setMessageField(value: string) {
    this.messageField = value
  }

  get chatIds() {
    return Array.from(this.chats).map(([key]) => key)
  }

  createNewChat(username: string, message: IMessage) {
    this.chats.set(username, {
      ...message,
      isMyself: this.isMyself(message.from),
    })

    this.messages.set(username, [message])
  }

  clear() {
    this.messages.clear()
    this.chats.clear()
    this.closeSocket()
  }

  private handleAuthEvent(data: any[]) {
    const castedMessages = array().of(initialResponseSchema).cast(data)

    if (!castedMessages) return console.log('wrong type', data)

    castedMessages.forEach(({ username, messages, lastMessage }) => {
      const existingChat = this.chats.has(username)

      if (!existingChat) {
        this.chats.set(username, lastMessage)
      }

      if (this.messages.has(username)) return

      this.messages.set(username, messages)
    })
  }

  isMyself(from: string) {
    return this.app.user.username === from
  }

  private handleReceiveMessage(data: any) {
    const castedMessage = messageSchema.cast(data)

    const { from, to } = castedMessage

    const isMyself = this.isMyself(from)

    const usernameKey = isMyself ? to : from

    const isAdded = this.addMessage(castedMessage, usernameKey)

    // create new chat if its message from new user

    if (isAdded) return this.updateLastMessage(castedMessage, usernameKey)

    this.createNewChat(usernameKey, {
      ...castedMessage,
    })
  }

  updateLastMessage(message: IMessage, usernameKey: string) {
    const lastMessage = this.chats.get(usernameKey)

    if (!lastMessage) return

    this.chats.set(usernameKey, {
      ...message,
      isMyself: this.isMyself(message.from),
    })
  }

  sendNewMessage(receiver: string) {
    const data = {
      event: EventType.SEND_MESSAGE,
      data: {
        from: this.app.user.username,
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
