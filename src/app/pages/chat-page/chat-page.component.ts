import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketServiceService } from 'src/app/websocket-service.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  currentUser: string = '';
  userList: any[] = [];
  room: string = '';
  chatData: any[] = [];
  isRoom: boolean = false;
  messageText: string = '';
  nameRoom: string = '';
  //emoji
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: { emoji: { native: any } }) {
    console.log(this.messageText);
    const { messageText } = this;
    console.log(messageText);
    console.log(`${event.emoji.native}`);
    const text = `${messageText}${event.emoji.native}`;

    this.messageText = text;
    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur');
  }
  //end emoji

  constructor(private socket: WebsocketServiceService, private router: Router) {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.socket.ws.onmessage = (resp) => {
      console.log('resp ~ ', resp);
      const data = JSON.parse(resp.data);
      console.log('data ~ ', data);
      if (data.status === 'success') {
        switch (data.event) {
          case 'LOGOUT':
            localStorage.setItem('currentUser', '');
            this.router.navigate(['/login']);
            break;
          case 'GET_USER_LIST':
            this.userList = data.data;
            break;
          case 'JOIN_ROOM':
            this.room = data.data.name;
            this.chatData = data.data.chatData.reverse();
            break;
          case 'GET_ROOM_CHAT_MES':
            this.chatData = data.data.chatData.reverse();
            break;
          case 'GET_PEOPLE_CHAT_MES':
            this.chatData = data.data.reverse();
            break;
          case 'SEND_CHAT':
            this.chatData.push(data.data);
            break;
          default:
            break;
        }
      } else {
        console.log('error ~ ', resp);
      }
    };
  }
  ngAfterViewInit(): void {
    // if (!this.currentUser) this.router.navigate(['/login'])
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getUserList();
    }, 1000);
  }
  // get user list
  getUserList(): void {
    const data = {
      action: 'onchat',
      data: {
        event: 'GET_USER_LIST',
      },
    };
    this.socket.sendMessage(data);
  }
  // join room
  joinRoom(roomSelected: any): void {
    this.room = roomSelected;
    this.isRoom = true;
    const data = {
      action: 'onchat',
      data: {
        event: 'JOIN_ROOM',
        data: {
          name: roomSelected,
        },
      },
    };
    this.socket.sendMessage(data);
  }
  //join room
  joinRoomName(): void {
    this.isRoom = true;
    const data = {
      action: 'onchat',
      data: {
        event: 'JOIN_ROOM',
        data: {
          name: this.nameRoom,
        },
      },
    };
    this.socket.sendMessage(data);
  }
  // check user
  checkUser(): void {
    const data = {
      action: 'onchat',
      data: {
        event: 'CHECK_USER',
        data: {
          user: '123',
        },
      },
    };
    this.socket.sendMessage(data);
  }
  // get room chat mess
  getRoomChatMess(): void {
    const data = {
      action: 'onchat',
      data: {
        event: 'GET_ROOM_CHAT_MES',
        data: {
          name: this.room,
          page: 1,
        },
      },
    };
    this.socket.sendMessage(data);
  }
  // get room chat mess
  getPeopleChatMess(people: any): void {
    this.room = people;
    this.isRoom = false;
    const data = {
      action: 'onchat',
      data: {
        event: 'GET_PEOPLE_CHAT_MES',
        data: {
          name: people,
          page: 1,
        },
      },
    };
    this.socket.sendMessage(data);
  }
  // send people
  sendPeople(): void {
    if (!this.messageText) return;
    const data = {
      action: 'onchat',
      data: {
        event: 'SEND_CHAT',
        data: {
          type: 'people',
          to: this.room,
          mes: this.messageText,
        },
      },
    };
    this.chatData.push({ name: this.currentUser, mes: this.messageText });
    console.log('send with data ~ ', data);
    this.socket.sendMessage(data);
    this.messageText = '';
  }
  sendRoom(): void {
    if (!this.messageText) return;
    const data = {
      action: 'onchat',
      data: {
        event: 'SEND_CHAT',
        data: {
          type: 'room',
          to: this.room,
          mes: this.messageText,
        },
      },
    };
    this.socket.sendMessage(data);
    this.chatData.push({ name: this.currentUser, mes: this.messageText });
    this.messageText = '';
  }
  createRoom(): void {
    const data = {
      action: 'onchat',
      data: {
        event: 'CREATE_ROOM',
        data: {
          name: this.nameRoom,
        },
      },
    };
    this.socket.sendMessage(data);
  }
  // logout
  logOut() {
    const dataLogout = {
      action: 'onchat',
      data: {
        event: 'LOGOUT',
      },
    };
    this.socket.sendMessage(dataLogout);
    this.socket.connect();
  }
  // relogin
  reLogin() {
    this.socket.reLogin();
  }
}
