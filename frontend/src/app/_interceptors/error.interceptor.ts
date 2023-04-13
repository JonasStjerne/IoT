import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../_services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.errorService.handleError(error);
        const errorResponse = error.error;
        return throwError(errorResponse);
      })
    );
  }
  // return new Observable((observer) => {
  //   next.handle(request).subscribe(
  //     (event) => {
  //       observer.next(event);
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.status !== 200) {
  //         this.errorService.handleError(err);
  //       }
  //     },
  //     () => {
  //       observer.complete();
  //     }
  //   );
  // });
}
