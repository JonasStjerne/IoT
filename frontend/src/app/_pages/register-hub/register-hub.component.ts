import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-register-hub',
  templateUrl: './register-hub.component.html',
  styleUrls: ['./register-hub.component.css'],
})
export class RegisterHubComponent implements OnInit {
  id = '';
  secret = '';

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addHub() {
    this.apiService
      .hubControllerRegister({ body: { id: this.id, secret: this.secret } })
      .subscribe({
        next: (res) => {
          this.toastService.success('Hub registered successfully');
          this.router.navigate(['/home']);
        },
      });
  }
}
