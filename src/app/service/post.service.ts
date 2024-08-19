import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  createPost(formValue: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  createNewPost(data: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/posts`, data);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts`);
  }

  getPostById(id:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/` + id);
  }
}
