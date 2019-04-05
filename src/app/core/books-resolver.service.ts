import {Injectable} from '@angular/core';
import {BookTrackerError} from '../models/bookTrackerError';
import {Book} from '../models/book';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DataService} from './data.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks().pipe(
      catchError(err => of(err))
    );
  }
}
