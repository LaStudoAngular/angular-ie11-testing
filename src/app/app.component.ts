import { Component } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { Post } from './post';
import { PostService } from './service/post.service';

@Component({
  selector: 'ie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-ie11-testing';
  public subtitle = 'angular-ie11-testing is running';
  public postResult: Post;
  loading = false;

  public doPost(): void {
    const post: Post = {
      title: 'title',
      body: 'body',
      userId: 1
    };
    this.postService
      .post(post)
      .pipe(
        tap(() => this.loading = true),
        finalize(() => this.loading = false)
      )
      .subscribe((response: Post) => this.postResult = response);
  }

  constructor(readonly postService: PostService) { } // why readonly?
}
