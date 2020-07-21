import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a 201 after success POST method', fakeAsync(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const responseObject = {
      id: 101,
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    service.post({
      title: 'foo',
      body: 'bar',
      userId: 1
    }).subscribe(responseServer => {
      expect(responseServer).toEqual(responseObject);
    });

    const requestWrapper = httpMock.expectOne(url);
    tick();

    expect(requestWrapper.request.method).toEqual('POST');
    requestWrapper.flush(responseObject);
  }));
});
