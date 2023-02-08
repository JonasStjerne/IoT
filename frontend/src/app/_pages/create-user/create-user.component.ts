import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserDto } from 'src/app/_api/models';
import { ApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  email = '';
  password = '';

  registerUser() {
    this.apiService
      .usersControllerCreate({
        body: { username: this.email, password: this.password },
      })
      .subscribe((res) => {
        this.toastr.success('User created, please login');
        this.router.navigate(['/login']);
      });
  }
}
