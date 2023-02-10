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

import { CreateActionDto } from '../models/create-action-dto';
import { CreateHubDto } from '../models/create-hub-dto';
import { CreateUserDto } from '../models/create-user-dto';
import { CreateWorkerDto } from '../models/create-worker-dto';
import { Hub } from '../models/hub';
import { LoginResponse } from '../models/login-response';
import { LoginUserDto } from '../models/login-user-dto';
import { RegisterHubDto } from '../models/register-hub-dto';
import { UpdateActionDto } from '../models/update-action-dto';
import { UpdateHubDto } from '../models/update-hub-dto';
import { UpdateWorkerDto } from '../models/update-worker-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation appControllerGetHello
   */
  static readonly AppControllerGetHelloPath = '/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerGetHello()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetHello$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AppControllerGetHelloPath, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appControllerGetHello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetHello(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.appControllerGetHello$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation appControllerProtected
   */
  static readonly AppControllerProtectedPath = '/protected';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerProtected()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerProtected$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AppControllerProtectedPath, 'get');
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
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: {
    context?: HttpContext
    body: LoginUserDto
  }
): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AuthControllerLoginPath, 'post');
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
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: {
    context?: HttpContext
    body: LoginUserDto
  }
): Observable<LoginResponse> {

    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

  /**
   * Path part for operation usersControllerCreate
   */
  static readonly UsersControllerCreatePath = '/users/create';

  /**
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

    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerCreatePath, 'post');
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
  static readonly UsersControllerDeletePath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerDelete$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerDeletePath, 'delete');
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

  /**
   * Path part for operation hubControllerFindAll
   */
  static readonly HubControllerFindAllPath = '/hub';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Hub>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Hub>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<Array<Hub>> {

    return this.hubControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Hub>>) => r.body as Array<Hub>)
    );
  }

  /**
   * Path part for operation hubControllerCreate
   */
  static readonly HubControllerCreatePath = '/hub';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateHubDto
  }
): Observable<StrictHttpResponse<Hub>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<Hub>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerCreate(params: {
    context?: HttpContext
    body: CreateHubDto
  }
): Observable<Hub> {

    return this.hubControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerFindOne
   */
  static readonly HubControllerFindOnePath = '/hub/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.hubControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation hubControllerRemove
   */
  static readonly HubControllerRemovePath = '/hub/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.hubControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation hubControllerRename
   */
  static readonly HubControllerRenamePath = '/hub/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRename()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRename$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateHubDto
  }
): Observable<StrictHttpResponse<Hub>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerRenamePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Hub>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRename$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRename(params: {
    id: string;
    context?: HttpContext
    body: UpdateHubDto
  }
): Observable<Hub> {

    return this.hubControllerRename$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerRegister
   */
  static readonly HubControllerRegisterPath = '/hub/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRegister$Response(params: {
    context?: HttpContext
    body: RegisterHubDto
  }
): Observable<StrictHttpResponse<Hub>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerRegisterPath, 'post');
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
        return r as StrictHttpResponse<Hub>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  hubControllerRegister(params: {
    context?: HttpContext
    body: RegisterHubDto
  }
): Observable<Hub> {

    return this.hubControllerRegister$Response(params).pipe(
      map((r: StrictHttpResponse<Hub>) => r.body as Hub)
    );
  }

  /**
   * Path part for operation hubControllerUnRegister
   */
  static readonly HubControllerUnRegisterPath = '/hub/unregister/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `hubControllerUnRegister()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerUnRegister$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.HubControllerUnRegisterPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `hubControllerUnRegister$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  hubControllerUnRegister(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.hubControllerUnRegister$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation workerControllerFindAll
   */
  static readonly WorkerControllerFindAllPath = '/worker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.WorkerControllerFindAllPath, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.workerControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation workerControllerCreate
   */
  static readonly WorkerControllerCreatePath = '/worker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateWorkerDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.WorkerControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerCreate(params: {
    context?: HttpContext
    body: CreateWorkerDto
  }
): Observable<string> {

    return this.workerControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation workerControllerFindOne
   */
  static readonly WorkerControllerFindOnePath = '/worker/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.WorkerControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.workerControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation workerControllerRemove
   */
  static readonly WorkerControllerRemovePath = '/worker/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.WorkerControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.workerControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation workerControllerUpdate
   */
  static readonly WorkerControllerUpdatePath = '/worker/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerUpdate$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.WorkerControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerUpdate(params: {
    id: string;
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<string> {

    return this.workerControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation actionControllerFindAll
   */
  static readonly ActionControllerFindAllPath = '/action';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ActionControllerFindAllPath, 'get');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.actionControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation actionControllerCreate
   */
  static readonly ActionControllerCreatePath = '/action';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateActionDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ActionControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerCreate(params: {
    context?: HttpContext
    body: CreateActionDto
  }
): Observable<string> {

    return this.actionControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation actionControllerFindOne
   */
  static readonly ActionControllerFindOnePath = '/action/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ActionControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.actionControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation actionControllerRemove
   */
  static readonly ActionControllerRemovePath = '/action/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ActionControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<string> {

    return this.actionControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation actionControllerUpdate
   */
  static readonly ActionControllerUpdatePath = '/action/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerUpdate$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateActionDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.ActionControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerUpdate(params: {
    id: string;
    context?: HttpContext
    body: UpdateActionDto
  }
): Observable<string> {

    return this.actionControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
