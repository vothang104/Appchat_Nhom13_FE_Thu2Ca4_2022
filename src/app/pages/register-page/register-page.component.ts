import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketServiceService } from 'src/app/websocket-service.service';

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
    private socket: WebsocketServiceService
  ) { 
    this.socket.ws.onmessage = (resp: any) => {
      const data = JSON.parse(resp.data);
      console.log(data);
      if (data.status === 'success') {
        alert("Đăng ký tài khoản thành công")
        this.router.navigate(['/login']);
      } else {
        alert('Đăng ký không thành công!!');
        this.router.navigate(['/register']);
      }
    };
  }
 
 
  

  ngOnInit(){}
   
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
        }
      }
    }
    this.socket.sendMessage(dataRegister);
  }
    
  }



