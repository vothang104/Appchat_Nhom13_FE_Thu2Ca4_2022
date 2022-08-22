import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebsocketServiceService } from 'src/app/websocket-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  hide: boolean = false;
  user: string = '';
  pass: string = '';
  currentUser: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private socket: WebsocketServiceService
  ) {
    this.socket.ws.onmessage = (resp: any) => {
      const data = JSON.parse(resp.data);
      console.log(data);
      if (data.status === 'success') {
        localStorage.setItem('relogin_code', JSON.stringify(data.data))
        this.router.navigate(['/chat']);
        localStorage.setItem('currentUser', this.user);
      } else {
        alert('sai thong tin dang nhap');
        this.router.navigate(['/login']);
      }
    };
  }
  ngOnDestroy(): void { }

  ngOnInit() { }

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [Validators.required, Validators.minLength(5)]],
  });

  onLogin() {
    const dataLogin = {
      action: 'onchat',
      data: {
        event: 'LOGIN',
        data: {
          user: this.user,
          pass: this.pass,
        },
      },
    };
    this.socket.sendMessage(dataLogin);
  }
}
