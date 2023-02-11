import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserDto } from 'src/app/_api/models';
import { UserService } from 'src/app/_services/user.service';
import { UserApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  email = '';
  password = '';

  registerUser() {
    this.userApiService
      .usersControllerCreate({
        body: { username: this.email, password: this.password },
      })
      .subscribe((res) => {
        this.toastr.success('User created, please login');
        this.router.navigate(['/login']);
      });
  }
}
