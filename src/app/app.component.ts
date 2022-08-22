import { WebsocketServiceService } from 'src/app/websocket-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Frontend-angular-appchat';
  constructor(socket: WebsocketServiceService) {
    socket.ws.onopen = () => {
      console.log('Connected websocket');
    };
  }
}
