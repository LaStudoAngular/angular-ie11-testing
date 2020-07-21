import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  post(body: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Post>(`${environment.BASE_URL}/posts`, body, { headers });
  }

  constructor(private http: HttpClient) { }
}
