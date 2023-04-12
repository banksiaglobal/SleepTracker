import { Injectable } from '@angular/core';
import { IToken } from '../interfaces/token';

enum DATA {
  ACCESS_TOKEN = 'acess_token',
  CURRENT_USER = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  clean(): void {
    localStorage.clear();
  }

  public saveUser(userResponse: IToken): void {
    localStorage.removeItem(DATA.CURRENT_USER);
    localStorage.removeItem(DATA.ACCESS_TOKEN);
    localStorage.setItem(
      DATA.CURRENT_USER,
      JSON.stringify(userResponse.access_token)
    );
    localStorage.setItem(
      DATA.CURRENT_USER,
      JSON.stringify(userResponse.username)
    );
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
