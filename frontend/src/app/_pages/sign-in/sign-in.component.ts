import { Component, OnInit } from '@angular/core';
import { LoginUserDto } from 'src/app/_api/models';
import { ApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  username = '';
  password = '';

  ngOnInit(): void {}

  signIn() {
    this.apiService
      .appControllerLogin({
        body: { username: this.username, password: this.password },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
