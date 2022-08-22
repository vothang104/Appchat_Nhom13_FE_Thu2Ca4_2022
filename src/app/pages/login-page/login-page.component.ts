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
  ) { }
  ngOnDestroy(): void {
    this.socket.close()
  }

  ngOnInit() {
    this.socket.open()
    this.socket.client.onmessage = (resp: any) => {
      console.log(resp);
      const data = JSON.parse(resp.data);
      if (data?.status === 'success') {
        console.log(data);
        localStorage.setItem('RE_LOGIN_CODE', data.data.RE_LOGIN_CODE)
        this.currentUser = this.user;
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
    userName: ['', [Validators.required, Validators.minLength(3)]],
    passWord: ['', [Validators.required, Validators.minLength(2)]],
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
