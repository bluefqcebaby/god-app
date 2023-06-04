type IRoutes = {
  [key: string]: string
}

export const Routes = {
  //stacks
  _auth: 'auth_stack',
  _home: 'home_stack',
  _tabs: 'tabs_stack',
  _splash: 'splash',

  //screens
  home: 'home',
  signIn: 'signIn',
  signUp: 'signUp',
  chat: 'chat',
  person_chat: 'chat:id',
}
