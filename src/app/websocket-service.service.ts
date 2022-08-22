import { Injectable } from '@angular/core';

const chatUrl = 'ws://140.238.54.136:8080/chat/chat';
@Injectable({
  providedIn: 'root',
})
export class WebsocketServiceService {
  ws: WebSocket
  constructor() {
    this.ws = new WebSocket(chatUrl)
  }
  sendMessage(data: any) {
    console.log('status ~ ', this.ws.readyState);
    this.ws.send(JSON.stringify(data))
  }
  reLogin(): void {
    const reLoginCodeJson = localStorage.getItem('relogin_code')
    const dataReLogin = JSON.parse(reLoginCodeJson || '')
    const user = localStorage.getItem('currentUser') || ''
    const data = {
      action: 'onchat',
      data: {
        event: 'RE_LOGIN',
        data: {
          user: user,
          code: dataReLogin.RE_LOGIN_CODE
        }
      }
    }
    this.sendMessage(data)
  }
}
