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
  constructor() {
    this.user$.subscribe();
  }
  token: string | null = null;

  logOut() {
    this.token = null;
    this.user$.next(null);
    //If user not on loginpage redirect to loginpage and remeber redirect url
    console.log('Service: User logged out');
  }

  //Automaticlly gets called from app.components.ts when app starts
  loadTokenFromLocalStorage() {
    this.token = localStorage.getItem('token');
  }
  //Automaticlly gets called from app.components.ts when app gets destroyed
  saveTokenToLocalStorage() {
    if (this.token) {
      localStorage.setItem('token', this.token);
    } else {
      localStorage.removeItem('token');
    }
  }
}
