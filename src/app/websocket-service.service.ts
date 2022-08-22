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
    this.ws.send(JSON.stringify(data))
  }
}
