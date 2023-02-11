import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { LoginUserDto, User } from 'src/app/_api/models';
import { AuthApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private authApiService: AuthApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {}
  username = '';
  password = '';

  ngOnInit(): void {}

  signIn() {
    this.authApiService
      .authControllerLogin({
        body: { username: this.username, password: this.password },
      })
      .subscribe({
        next: (res) => {
          this.userService.token = res.access_token;
          this.userService.userId = this.userService.parseJwt(
            res.access_token
          ).sub;
          this.route.queryParams.pipe(take(1)).subscribe((params) => {
            this.toasterService.success('You are now logged in');
            const redirectUrl = params.redirectUrl || '/home';
            this.router.navigate([redirectUrl]);
          });
        },
      });
  }
}
