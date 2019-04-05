import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import {any} from 'codelyzer/util/function';
import {BooktrackerPage} from '../../../e2e/app.po';
import {BookTrackerError} from '../models/bookTrackerError';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute) { }
  
  ngOnInit() {
    let data: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if(data instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${data.friendlyMessage}`)
    } else {
      this.allBooks = data;
    }

    /// getting data without resolvers
    // this.dataService.getAllBooks().subscribe(
    //   (data: Book[]) => this.allBooks = data,
    //   (err: BookTrackerError) => console.log(err.friendlyMessage),
    //   () => console.log("Finished logging books")
    // );

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      (data: void) => {
        let index = this.allBooks.findIndex(book => book.bookID === bookID);
        this.allBooks.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
