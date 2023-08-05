import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup = this.fb.group({
    email : [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password : [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ] 
  });

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private authService : AuthService
  ) {}

  login() {
    const {email, password} = this.loginForm.value ;

    this.authService.login(email,password)
      .subscribe((value) => {
        if(value === true ){
          this.router.navigateByUrl('/admi');
        }
        else{
          console.log(value);
          const {msg} = value as  {ok : boolean, msg :string};
          
          Swal.fire('Error',msg,'error');
        }
      });
  }
}
