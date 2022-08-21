import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebsocketServiceService } from 'src/app/websocket-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide: boolean = false;
  user: string = '';
  pass: string = '';
  currentUser: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private socket: WebsocketServiceService
  ) {}

  ngOnInit() {
    this.socket.client.onmessage = (resp: any) => {
      console.log(resp);
      const data = JSON.parse(resp.data);
      if (data?.status === 'success') {
        console.log(data);
        this.socket.currentUser = this.user;
        this.user = '';
        this.pass = '';
        this.router.navigate(['/chat']);
      } else {
        alert(data.mes);
        this.user = '';
        this.pass = '';
        this.router.navigate(['/login']);
      }
    };
  }

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [Validators.required, Validators.minLength(5)]],
  });

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
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
    this.socket.login(dataLogin);
  }
}
