import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../_services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(
    //       catchError((error) => {
    //         if (error.status === 401) {
    //           // auto logout if 401 response returned from api
    //           this.userService.logout();
    //           location.reload(true);
    //         }

    //         const errorResponse = error.error;
    //         return throwError(errorResponse);
    //       })
    //     );
    //   }
    return new Observable((observer) => {
      next.handle(request).subscribe(
        (event) => {
          observer.next(event);
        },
        (err) => {
          this.errorService.handleError(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
}
