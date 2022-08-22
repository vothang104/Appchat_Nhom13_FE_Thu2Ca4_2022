import { Injectable } from '@angular/core';

const chatUrl = 'ws://140.238.54.136:8080/chat/chat';
@Injectable({
  providedIn: 'root',
})
export class WebsocketServiceService {
  client: any;
  constructor() {
    // this.client = new WebSocket(chatUrl);
    // this.client.onopen = () => {
    //   console.log('Connected to server');
    // };
  }
  open() {
    if (!this.client || this.client.CLOSED) {
      this.client = new WebSocket(chatUrl)
    }
    this.client.onopen = () => {
      console.log('Connected to server');

    }
  }
  close() {
    this.client.close()
  }
  login(data: any): void {
    this.client.send(JSON.stringify(data));
  }
  getUserList(data: any): void {
    this.client.send(JSON.stringify(data))
  }
  reLogin(data: any): void {
    this.client.send(JSON.stringify(data))
  }
}
