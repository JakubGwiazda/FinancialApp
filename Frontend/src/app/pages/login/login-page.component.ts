import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'crypto-api/model/authorization';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: false
})
export class LoginPageComponent {

  constructor(private router: Router, private authorizationService: AuthorizationService, private tokenStorage: TokenStorageService){}

  userForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(){
    this.authorizationService.login({ ...this.userForm.value }).subscribe(async p => 
    {
      await this.tokenStorage.saveToken(p.value!.token!)
      await this.tokenStorage.saveRefreshToken(p.value!.refreshToken!)
      
      this.router.navigate(['/dashboard']);
    })    
  }

  registerAccount(){
    this.router.navigate(['/register-account']);
  }

}
