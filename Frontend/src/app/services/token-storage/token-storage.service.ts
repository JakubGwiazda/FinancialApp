import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private tokenKey = 'auth-token';
  private refreshTokenKey = 'refresh-token';

  constructor() { }
  
  async saveToken(token: string): Promise<void> {
    await SecureStoragePlugin.set({
      key: this.tokenKey,
      value: token,
    });
  }

  async saveRefreshToken(token: string): Promise<void> {
    await SecureStoragePlugin.set({
      key: this.refreshTokenKey,
      value: token,
    });
  }

  async getToken(): Promise<string | null> {
    try {
      const result = await SecureStoragePlugin.get({ key: this.tokenKey });
      return result.value;
    } catch {
      return null;
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const result = await SecureStoragePlugin.get({ key: this.refreshTokenKey });
      return result.value;
    } catch {
      return null;
    }
  }

  async removeToken(): Promise<void> {
    await SecureStoragePlugin.remove({ key: this.tokenKey });
  }

  async removeRefreshToken(): Promise<void> {
    await SecureStoragePlugin.remove({ key: this.refreshTokenKey });
  }
}
