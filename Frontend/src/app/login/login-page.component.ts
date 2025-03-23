import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: false
})
export class LoginPageComponent {

  userForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    passwordConfirmed: new FormControl('', [Validators.required])
  });

  onSubmit(){

    if(this.userForm.controls.password.value === this.userForm.controls.passwordConfirmed.value){
      console.log('hasla sie zgadzaja')
    }else{
      console.log('hasla sie nie zgadzaja')
    }
  }

}
