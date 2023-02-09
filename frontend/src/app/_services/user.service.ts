import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_api/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  public userId: User['id'] | null = null;

  constructor(private router: Router) {
    this.user$.subscribe();
  }
  token: string | null = null;

  logOut() {
    this.token = null;
    this.userId = null;
    this.user$.next(null);
    //If user not on loginpage redirect to loginpage and remeber redirect url
    if (this.router.url !== '/login') {
      this.router.navigate(['/login'], {
        queryParams: { redirectUrl: this.router.url },
      });
    }
  }

  //Automaticlly gets called from app.components.ts when app starts
  loadTokenFromLocalStorage() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userId = this.parseJwt(this.token).sub;
    }
  }
  //Automaticlly gets called from app.components.ts when app gets destroyed
  saveTokenToLocalStorage() {
    if (this.token) {
      localStorage.setItem('token', this.token);
    } else {
      localStorage.removeItem('token');
    }
  }

  parseJwt(token: string): { exp: number; iat: number; sub: number } {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
