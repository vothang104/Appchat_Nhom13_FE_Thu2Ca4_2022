import { Injectable } from '@angular/core';

const chatUrl = 'ws://140.238.54.136:8080/chat/chat';
@Injectable({
  providedIn: 'root',
})
export class WebsocketServiceService {
  client: any;
  currentUser: any;
  constructor() {
    this.client = new WebSocket(chatUrl);
    this.client.onopen = () => {
      console.log('Connected to server');
    };
  }
  login(data: any): void {
    this.client.send(JSON.stringify(data));
  }
  register(data: any): void {
    this.client.send(JSON.stringify(data));
  }
}
