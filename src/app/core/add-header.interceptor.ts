import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeader interceptor at url: ${req.url}`)

    const headerReq = req.clone({
      setHeaders: {'Content-Type': 'application/json'}
    });

    return next.handle(headerReq).pipe(
      tap(event => {
        if (HttpEventType.Response === event.type) {
          console.log(event.body)
        }
      })
    );
  }
}
