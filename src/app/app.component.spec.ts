import { PostService } from './service/post.service';
import { AppComponent } from './app.component';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [AppComponent],
        providers: [PostService],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ]
      })
      .compileComponents();

    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it(`should have a title 'angular-ie11-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('angular-ie11-testing');
  });

  it('should render title with span', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const html = fixture.nativeElement;
    expect(html.querySelector('.test span').textContent).toContain('angular-ie11-testing is running');
  });

  it('should be initiliazed service', inject([PostService], (postService: PostService) => {
    expect(postService).toBeTruthy();
  }));

  it('should verify that click on a button works properly', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(fixture.componentInstance, 'doPost');
    button.click();
    expect(fixture.componentInstance.doPost).toHaveBeenCalled();
  }));

  it('should verify that click on the button returned data', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const button = fixture.debugElement.nativeElement.querySelector('.magic-button');
    const component = fixture.componentInstance;
    const fetchTaskDataSpy = spyOn(component.service, 'post').and.returnValue(of({somedata: 'test'}));
    button.click();
    tick();

    expect(fetchTaskDataSpy.calls.any).toBeTruthy();
    expect(component.postResult).not.toBeUndefined();
  }));
});
