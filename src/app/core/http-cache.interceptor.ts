import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CacheService} from '../services/cache.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor{

  constructor(private cacheService: CacheService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //pass along non-cacheable requests and invalidate cache
    if (req.method !== 'GET') {
      console.log(`Invalidate cache: ${req.method} ${req.url}`)
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    //attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    //retrieve a cached response
    if (cachedResponse) {
      console.log(`Retrieved cached response to: ${cachedResponse.url}`)
      console.log(cachedResponse)
      return of(cachedResponse);
    }

    //retrieve from the server and cache the response
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req.url, event);
          console.log(`Added item to cache: ${req.url}`);
        }
      })
    )
  }
}
