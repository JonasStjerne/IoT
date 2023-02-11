/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CreateUserDto } from '../models/create-user-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usersControllerCreate
   */
  static readonly UsersControllerCreatePath = '/user/create';

  /**
   * Create a new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.UsersControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Create a new user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreate(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<User> {

    return this.usersControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation usersControllerDelete
   */
  static readonly UsersControllerDeletePath = '/user';

  /**
   * Delete users own acount.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerDelete$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.UsersControllerDeletePath, 'delete');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete users own acount.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerDelete(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.usersControllerDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
