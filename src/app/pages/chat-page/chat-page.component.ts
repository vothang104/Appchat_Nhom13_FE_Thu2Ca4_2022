import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketServiceService } from 'src/app/websocket-service.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, AfterViewInit {
  currentUser: string = '';

  constructor(private socket: WebsocketServiceService, private router: Router) {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.socket.ws.onmessage = (resp) => {
      const data = JSON.parse(resp.data);
      if (data.status === 'success') {
        localStorage.setItem('currentUser', '');
        this.router.navigate(['/login']);
      }
    };
    console.log(this.currentUser);
  }
  ngAfterViewChecked(): void {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {}
  logOut() {
    const dataLogout = {
      action: 'onchat',
      data: {
        event: 'LOGOUT',
      },
    };
    this.socket.sendMessage(dataLogout);
  }
}
