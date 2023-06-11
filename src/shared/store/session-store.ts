import { action, makeAutoObservable, makeObservable, observable } from 'mobx'

type AuthState = 'login' | 'logout'

export class SessionStore {
  username = ''
  isLogged = false
  jwtToken = ''
  private _loginSubscribers: Function[] = []
  private _logoutSubscribers: Function[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setIsLogged(value: boolean) {
    this.isLogged = value
  }

  setJwtToken(token: string) {
    this.jwtToken = token
  }

  setUsername(value: string) {
    this.username = value
  }

  triggerSubs(on: AuthState) {
    if (on === 'login') {
      this._loginSubscribers.forEach(fn => fn())
    }

    if (on === 'logout') {
      this._loginSubscribers.forEach(fn => fn())
    }
  }

  subscribe(on: AuthState, event: Function) {
    if (on === 'login') {
      this._loginSubscribers.push(event)
    }

    if (on === 'logout') {
      this._logoutSubscribers.push(event)
    }
  }
}

export const sessionStore = new SessionStore()
