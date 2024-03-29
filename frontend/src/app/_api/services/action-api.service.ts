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

import { Action } from '../models/action';
import { CreateActionDto } from '../models/create-action-dto';
import { UpdateActionDto } from '../models/update-action-dto';

@Injectable({
  providedIn: 'root',
})
export class ActionApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation actionControllerFindAll
   */
  static readonly ActionControllerFindAllPath = '/action';

  /**
   * Return all actions connected to a worker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindAll$Response(params: {
    workerId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Action>>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerFindAllPath, 'get');
    if (params) {
      rb.query('workerId', params.workerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Action>>;
      })
    );
  }

  /**
   * Return all actions connected to a worker.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindAll(params: {
    workerId: string;
    context?: HttpContext
  }
): Observable<Array<Action>> {

    return this.actionControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Action>>) => r.body as Array<Action>)
    );
  }

  /**
   * Path part for operation actionControllerCreate
   */
  static readonly ActionControllerCreatePath = '/action';

  /**
   * Create new action for worker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerCreate$Response(params: {
    workerId: string;
    context?: HttpContext
    body: CreateActionDto
  }
): Observable<StrictHttpResponse<Action>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerCreatePath, 'post');
    if (params) {
      rb.query('workerId', params.workerId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Action>;
      })
    );
  }

  /**
   * Create new action for worker.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actionControllerCreate(params: {
    workerId: string;
    context?: HttpContext
    body: CreateActionDto
  }
): Observable<Action> {

    return this.actionControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<Action>) => r.body as Action)
    );
  }

  /**
   * Path part for operation actionControllerFindOneBy
   */
  static readonly ActionControllerFindOneByPath = '/action/{id}';

  /**
   * Find an action.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerFindOneBy()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindOneBy$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Action>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerFindOneByPath, 'get');
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
        return r as StrictHttpResponse<Action>;
      })
    );
  }

  /**
   * Find an action.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerFindOneBy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerFindOneBy(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Action> {

    return this.actionControllerFindOneBy$Response(params).pipe(
      map((r: StrictHttpResponse<Action>) => r.body as Action)
    );
  }

  /**
   * Path part for operation actionControllerRemove
   */
  static readonly ActionControllerRemovePath = '/action/{id}';

  /**
   * Delete an action.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Action>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerRemovePath, 'delete');
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
        return r as StrictHttpResponse<Action>;
      })
    );
  }

  /**
   * Delete an action.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Action> {

    return this.actionControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<Action>) => r.body as Action)
    );
  }

  /**
   * Path part for operation actionControllerUpdate
   */
  static readonly ActionControllerUpdatePath = '/action/{id}';

  /**
   * Update action.
   *
   *
   *
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
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * Update action.
   *
   *
   *
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
): Observable<void> {

    return this.actionControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation actionControllerSendInstantAction
   */
  static readonly ActionControllerSendInstantActionPath = '/action/instant-action';

  /**
   * Send a instant action to a worker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actionControllerSendInstantAction()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerSendInstantAction$Response(params: {
    workerId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ActionApiService.ActionControllerSendInstantActionPath, 'post');
    if (params) {
      rb.query('workerId', params.workerId, {});
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
   * Send a instant action to a worker.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actionControllerSendInstantAction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  actionControllerSendInstantAction(params: {
    workerId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.actionControllerSendInstantAction$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
