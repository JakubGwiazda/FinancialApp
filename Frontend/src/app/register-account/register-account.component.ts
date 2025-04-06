import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'crypto-api/model/authorization';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss',
  standalone: false,
})
export class RegisterAccountComponent {
  constructor(private router: Router,private authorizationService: AuthorizationService) {}

  userForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    passwordConfirmed: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (
      this.userForm.controls.password.value ===
      this.userForm.controls.passwordConfirmed.value
    ) {
      this.authorizationService.registerUser({
        name: this.userForm.controls.user.value,
        password: this.userForm.controls.password.value,
      }).subscribe(p =>  this.router.navigate(['/login']));
    
    } else {
      console.log('hasla sie nie zgadzaja');
    }
  }
}
