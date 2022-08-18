import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  hide: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  registerForm: FormGroup = this.fb.group({
   fullname: [''],
   mobile: [''],
   email: [''],
   password: [''],
   confirmps:['']
  });

  onRegister() {
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value);
  }
}

