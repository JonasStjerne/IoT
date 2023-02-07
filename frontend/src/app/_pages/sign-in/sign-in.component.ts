import { Component, OnInit } from '@angular/core';
import { LoginUserDto, User } from 'src/app/_api/models';
import { ApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
  username = '';
  password = '';

  ngOnInit(): void {}

  signIn() {
    this.apiService
      .authControllerLogin({
        body: { username: this.username, password: this.password },
      })
      .subscribe({
        next: (res) => {
          this.userService.token = res.access_token;
          console.log('logged in!');
        },
        error: (err) => console.error(err),
      });
  }
}
