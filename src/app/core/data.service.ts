import {Injectable} from '@angular/core';

import {allBooks, allReaders} from 'app/data';
import {Reader} from 'app/models/reader';
import {Book} from 'app/models/book';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OldBook} from '../models/old-book';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  booksUrl = '/api/books';

  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log("Starting logging the books")
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(id: number): Observable<Book> {
    // console.log(`${this.booksUrl}/${id}`);
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'token'
    });

    return this.http.get<Book>(`${this.booksUrl}/${id}`, {
      headers: getHeaders
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`).pipe(
      map( book => <OldBook>{
        bookTitle: book.title,
        year: book.publicationYear
      }),
      tap(oldBook => console.log(oldBook))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`${this.booksUrl}/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`${this.booksUrl}/${bookID}`);
  }


}
