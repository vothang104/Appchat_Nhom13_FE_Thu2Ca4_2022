import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(6)]],
    passWord: ['', [Validators.required, Validators.minLength(8)]],
  });

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
