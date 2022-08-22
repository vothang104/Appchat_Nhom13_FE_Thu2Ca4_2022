import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebsocketServiceService } from 'src/app/websocket-service.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, AfterViewInit {

  currentUser: string = ''
  constructor(private socket: WebsocketServiceService) { }
  ngAfterViewChecked(): void {

  }
  ngAfterViewInit(): void {
    const dataReLogin = {
      action: 'onchat',
      data: {
        event: 'RE_LOGIN',
        data: {
          user: 'long',
          code: localStorage.getItem('RE_LOGIN_CODE')
        }
      }
    }
    this.socket.reLogin(dataReLogin)
  }
  ngOnInit(): void {
    this.socket.open()
    // lang nghe
    this.socket.client.onmessage = (resp: any) => {
      console.log('resp ~ ', resp);

    }
  }


}
