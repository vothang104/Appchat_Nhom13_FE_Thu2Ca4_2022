import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  hide: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  registerForm: FormGroup = this.fb.group({
   fullname: [''],
   mobile: [''],
   email: [''],
   password: [''],
   confirmps:['']
  });

  onRegister() {
    this.http.post<any>("http://localhost:3000/registerUsers", this.registerForm.value).subscribe(res=>{
      alert("Register Successfull");
      this.registerForm.reset();
      this.router.navigate(["login"]);
    },err=>{
      alert("Something went wrong!!");
    })
}}

