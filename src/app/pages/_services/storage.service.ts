import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = 'auth-data';

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
      const userObj = {
        token: user.token,
        role: user.role
      };
      window.sessionStorage.removeItem(this.USER_KEY);
      window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(userObj));
    }
  }

  public getUser(): any {
    if (this.isBrowser()) {
      const user = window.sessionStorage.getItem(this.USER_KEY);
      if (user) {
        const userObj = JSON.parse(user);
        return {
          token: userObj.token,
          role: userObj.role
        };
      }
    }
    return null;
  }


  public isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const user = window.sessionStorage.getItem(this.USER_KEY);
      return !!user;
    }
    return false;
  }
}
