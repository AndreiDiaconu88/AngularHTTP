import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap( event => {
        if (event.type === HttpEventType.Response) {
          console.log(`LogResponseInterceptor to ${req.url} has response: ${JSON.stringify(event.body)}`)
        }
      })
    )
  }

}
