import { Injectable } from '@angular/core';

enum DATA {
  ACCESS_TOKEN = 'access_token',
  CURRENT_USER = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: string): void {
    localStorage.removeItem(DATA.CURRENT_USER);
    localStorage.setItem(DATA.CURRENT_USER, JSON.stringify(user));
  }

  public saveTokens(accessToken: string): void {
    localStorage.removeItem(DATA.ACCESS_TOKEN);
    localStorage.setItem(DATA.ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  public getUser(): string {
    const user = localStorage.getItem(DATA.CURRENT_USER);

    if (user) {
      return JSON.parse(user);
    }

    return '';
  }

  public getAccessToken(): string {
    const token = localStorage.getItem(DATA.ACCESS_TOKEN);
    if (token) {
      return JSON.parse(token);
    }

    return '';
  }
}
