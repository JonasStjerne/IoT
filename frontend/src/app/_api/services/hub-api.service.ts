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

import { CreateHubDto } from '../models/create-hub-dto';
import { Hub } from '../models/hub';
import { RegisterHubDto } from '../models/register-hub-dto';
import { UpdateHubDto } from '../models/update-hub-dto';

@Injectable({
  providedIn: 'root',
})
export class HubApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation hubControllerFindAll
   */
  static readonly HubControllerFindAllPath = '/hub';

  /**
   * Return all hubs connected to user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindAll$Response(params?: {
    context?: HttpContext;
  }): Observable<StrictHttpResponse<Array<Hub>>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerFindAllPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<Hub>>;
        })
      );
  }

  /**
   * Return all hubs connected to user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindAll(params?: {
    context?: HttpContext;
  }): Observable<Array<Hub>> {
    return this.hubControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Hub>>) => r.body as Array<Hub>)
    );
  }

  /**
   * Path part for operation hubControllerCreate
   */
  static readonly HubControllerCreatePath = '/hub';

  /**
   * Create a new hub.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerCreate$Response(params: {
    context?: HttpContext;
    body: CreateHubDto;
  }): Observable<StrictHttpResponse<Hub>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerCreatePath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Hub>;
        })
      );
  }

  /**
   * Create a new hub.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerCreate(params: {
    context?: HttpContext;
    body: CreateHubDto;
  }): Observable<Hub> {
    return this.hubControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerfindOneBy
   */
  static readonly HubControllerfindOneByPath = '/hub/{id}';

  /**
   * Return hub of user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerfindOneBy()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerfindOneBy$Response(params: {
    id: string;
    context?: HttpContext;
  }): Observable<StrictHttpResponse<Hub>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerfindOneByPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Hub>;
        })
      );
  }

  /**
   * Return hub of user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerfindOneBy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerfindOneBy(params: {
    id: string;
    context?: HttpContext;
  }): Observable<Hub> {
    return this.hubControllerfindOneBy$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerRemove
   */
  static readonly HubControllerRemovePath = '/hub/{id}';

  /**
   * Delete hub.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerRemove$Response(params: {
    id: string;
    context?: HttpContext;
  }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerRemovePath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * Delete hub.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerRemove(params: {
    id: string;
    context?: HttpContext;
  }): Observable<string> {
    return this.hubControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation hubControllerRename
   */
  static readonly HubControllerRenamePath = '/hub/{id}';

  /**
   * Update hub of user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRename()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRename$Response(params: {
    id: string;
    context?: HttpContext;
    body: UpdateHubDto;
  }): Observable<StrictHttpResponse<Hub>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerRenamePath,
      'patch'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Hub>;
        })
      );
  }

  /**
   * Update hub of user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRename$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRename(params: {
    id: string;
    context?: HttpContext;
    body: UpdateHubDto;
  }): Observable<Hub> {
    return this.hubControllerRename$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerRegister
   */
  static readonly HubControllerRegisterPath = '/hub/register';

  /**
   * Register hub to user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRegister$Response(params: {
    context?: HttpContext;
    body: RegisterHubDto;
  }): Observable<StrictHttpResponse<Hub>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerRegisterPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Hub>;
        })
      );
  }

  /**
   * Register hub to user.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRegister(params: {
    context?: HttpContext;
    body: RegisterHubDto;
  }): Observable<Hub> {
    return this.hubControllerRegister$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerUnRegister
   */
  static readonly HubControllerUnRegisterPath = '/hub/unregister/{id}';

  /**
   * Delete users connection to hub.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerUnRegister()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerUnRegister$Response(params: {
    id: string;
    context?: HttpContext;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      HubApiService.HubControllerUnRegisterPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
          context: params?.context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * Delete users connection to hub.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerUnRegister$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerUnRegister(params: {
    id: string;
    context?: HttpContext;
  }): Observable<void> {
    return this.hubControllerUnRegister$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
