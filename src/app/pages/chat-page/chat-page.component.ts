import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebsocketServiceService } from 'src/app/websocket-service.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(private socket: WebsocketServiceService) {
    this.socket.ws.onmessage = (resp) => {
      console.log('resp ~ ', resp);
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getUserList()
    }, 1000);
  }
  // get user list
  getUserList(): void {
    const data = {
      action: 'onchat',
      data: {
        event: 'GET_USER_LIST'
      }
    }
    this.socket.sendMessage(data)
  }


}
