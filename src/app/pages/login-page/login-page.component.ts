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
  }

  ngOnInit() {

  }

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [Validators.required, Validators.minLength(5)]],
  });

  onLogin() {

  }
}
