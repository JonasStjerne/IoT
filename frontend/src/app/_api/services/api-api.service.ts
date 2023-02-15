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


@Injectable({
  providedIn: 'root',
})
export class ApiApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation appControllerProtected
   */
  static readonly AppControllerProtectedPath = '/protected';

  /**
   * Example of a proctected endpoint. All logged in users can access.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerProtected()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtected$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiApiService.AppControllerProtectedPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Example of a proctected endpoint. All logged in users can access.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appControllerProtected$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtected(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.appControllerProtected$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation appControllerProtectedAdmin
   */
  static readonly AppControllerProtectedAdminPath = '/protected-OnlyAdmin';

  /**
   * Example of a proctected endpoint. Only admins can access.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerProtectedAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtectedAdmin$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiApiService.AppControllerProtectedAdminPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Example of a proctected endpoint. Only admins can access.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appControllerProtectedAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtectedAdmin(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.appControllerProtectedAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation appControllerProtectedUser
   */
  static readonly AppControllerProtectedUserPath = '/protected-OnlyUser';

  /**
   * Example of a proctected endpoint. Only normal user can access.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerProtectedUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtectedUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiApiService.AppControllerProtectedUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Example of a proctected endpoint. Only normal user can access.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appControllerProtectedUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtectedUser(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.appControllerProtectedUser$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
