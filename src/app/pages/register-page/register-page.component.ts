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
  ) { }
  

  ngOnInit() {
    this.socket.client.onmessage = (resp: any) => {
      const data = JSON.parse(resp.data)
      console.log(data);
      
      if (data?.status === "success") {
        alert("register successfully")
        this.router.navigate(["/login"])
      }else {
        alert(`Register  ${data?.mes}`)
        this.user="";
        this.pass="";
        this.router.navigate(["/register"])
      }
    }
    
    
  }
 

  registerForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    passWord: ['', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25),
      // matchValidator('confirmPassword', true)
    ]],
    confirmassword: ['', [
      Validators.required,
      // matchValidator('password')
    ]],
  });

  onRegister() {

    const dataRegister = {

      action: 'onchat',
      data: {
        event: 'REGISTER',
        data: {
          user: this.user,
          pass: this.pass
        }
      }

    }
    this.socket.register(dataRegister)
  }

}

