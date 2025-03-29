import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const token = await this.tokenService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
