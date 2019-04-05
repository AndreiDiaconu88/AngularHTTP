import { Injectable } from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private requests:any  = {};

  constructor() { }

  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  put (url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  invalidateUrl (url: string) {
    this.requests[url] = undefined;
  }

  invalidateCache () {
    this.requests = {};
  }
}
