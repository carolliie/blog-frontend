import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  clean(): void {
    if (this.isBrowser()) {
      window.sessionStorage.clear();
    }
  }

  public saveUser(user: any): void {
    if (this.isBrowser()) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (this.isBrowser()) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  public isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return !!user;
    }
    return false;
  }
}
