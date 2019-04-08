import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {Book} from '../models/book';
import {TestBed} from '@angular/core/testing';
import {BookTrackerError} from '../models/bookTrackerError';


describe('Data service tests', () => {

  let dataService: DataService;
  let httpTestingController: HttpTestingController
  let booksArray: Book[] = [
    {'bookID': 2, 'title': 'Winnie-the-Pooh', 'author': 'A. A. Milne', 'publicationYear': 1926},
    {'bookID': 3, 'title': 'Where the Wild Things Are', 'author': 'Maurice Sendak', 'publicationYear': 1977},
    {'bookID': 4, 'title': 'The Hobbit', 'author': 'J. R. R. Tolkien', 'publicationYear': 1977}
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })

    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
    httpTestingController.verify();
  })

  it('Should get all the books', () => {
    dataService.getAllBooks().subscribe(
      (data: Book[]) => expect(data.length).toBe(3)
    );

    let booksRequest:TestRequest = httpTestingController.expectOne('/api/books');
    expect(booksRequest.request.method).toEqual('GET');

    booksRequest.flush(booksArray);
  });

  it('Should return a BookTrackerError', () => {
    dataService.getAllBooks().subscribe(
      (data:Book[]) => fail("this should have been an error"),
      (err: BookTrackerError) => {
        expect(err.errorNumber).toEqual(100);
        expect(err.friendlyMessage).toBe("An error occured when retrieving the information")
      }
    );

    let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    booksRequest.flush('error', {
      status: 500,
      statusText: "Server error."
    })
  })

})
