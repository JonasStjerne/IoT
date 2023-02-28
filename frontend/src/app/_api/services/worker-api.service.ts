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

import { CreateWorkerDto } from '../models/create-worker-dto';
import { UpdateWorkerDto } from '../models/update-worker-dto';
import { Worker } from '../models/worker';

@Injectable({
  providedIn: 'root',
})
export class WorkerApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerFindAllPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerCreatePath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerFindOnePath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerRemovePath, 'delete');
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
   * Update worker of hub.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerUpdate$Response(params: {
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<StrictHttpResponse<Worker>> {

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<Worker>;
      })
    );
  }

  /**
   * Update worker of hub.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerUpdate(params: {
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<Worker> {

    return this.workerControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<Worker>) => r.body as Worker)
    );
  }

}
