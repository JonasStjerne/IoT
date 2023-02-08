import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
      if (error.status == 401) {
        this.userService.logOut();
      }
    }
    this.toastService.error(errorMessage);
  }
}
