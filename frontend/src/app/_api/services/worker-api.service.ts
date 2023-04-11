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
   * Return all worker connected to a hub.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindAll$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Worker>>> {

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerFindAllPath, 'get');
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
        return r as StrictHttpResponse<Array<Worker>>;
      })
    );
  }

  /**
   * Return all worker connected to a hub.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindAll(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Array<Worker>> {

    return this.workerControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Worker>>) => r.body as Array<Worker>)
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
): Observable<StrictHttpResponse<Worker>> {

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
        return r as StrictHttpResponse<Worker>;
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
): Observable<Worker> {

    return this.workerControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<Worker>) => r.body as Worker)
    );
  }

  /**
   * Path part for operation workerControllerFindOneBy
   */
  static readonly WorkerControllerFindOneByPath = '/worker/{id}';

  /**
   * Find worker with id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerFindOneBy()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindOneBy$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Worker>> {

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerFindOneByPath, 'get');
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
        return r as StrictHttpResponse<Worker>;
      })
    );
  }

  /**
   * Find worker with id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerFindOneBy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workerControllerFindOneBy(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Worker> {

    return this.workerControllerFindOneBy$Response(params).pipe(
      map((r: StrictHttpResponse<Worker>) => r.body as Worker)
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
   * Path part for operation workerControllerRename
   */
  static readonly WorkerControllerRenamePath = '/worker/{id}';

  /**
   * Update worker.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workerControllerRename()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerRename$Response(params: {
    hubId: string;
    id: string;
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<StrictHttpResponse<Worker>> {

    const rb = new RequestBuilder(this.rootUrl, WorkerApiService.WorkerControllerRenamePath, 'patch');
    if (params) {
      rb.query('hubId', params.hubId, {});
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
        return r as StrictHttpResponse<Worker>;
      })
    );
  }

  /**
   * Update worker.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workerControllerRename$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  workerControllerRename(params: {
    hubId: string;
    id: string;
    context?: HttpContext
    body: UpdateWorkerDto
  }
): Observable<Worker> {

    return this.workerControllerRename$Response(params).pipe(
      map((r: StrictHttpResponse<Worker>) => r.body as Worker)
    );
  }

}
