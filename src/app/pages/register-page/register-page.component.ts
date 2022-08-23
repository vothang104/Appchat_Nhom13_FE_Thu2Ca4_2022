import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketServiceService } from 'src/app/websocket-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  hide: boolean = false;
  user: string = '';
  pass: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private socket: WebsocketServiceService
  ) {
    this.socket.ws.onmessage = (resp: any) => {
      const data = JSON.parse(resp.data);
      console.log(data);
      if (data.status === 'success') {
        this.toast.success({
          detail: 'Success Message',
          summary: 'Register is Success',
          duration: 5000,
        });
        this.router.navigate(['/login']);
      } else {
        this.toast.error({
          detail: 'Error Message',
          summary: 'Register is Failed, The account is already in use',
          duration: 5000,
        });
        this.router.navigate(['/register']);
        this.user = '';
        this.pass = '';
      }
    };
  }

  ngOnInit() {}

  registerForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [Validators.required, Validators.minLength(5)]],
  });

  onRegister() {
    const dataRegister = {
      action: 'onchat',
      data: {
        event: 'REGISTER',
        data: {
          user: this.user,
          pass: this.pass,
        },
      },
    };
    this.socket.sendMessage(dataRegister);
  }
}
