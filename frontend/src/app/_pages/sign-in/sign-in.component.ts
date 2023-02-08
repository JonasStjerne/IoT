import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
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
          this.route.queryParams.pipe(take(1)).subscribe((params) => {
            const redirectUrl = params.redirectUrl || '/home';
            console.log(params);
            this.router.navigate([redirectUrl]);
          });
        },
      });
  }
}
