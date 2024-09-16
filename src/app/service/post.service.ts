import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../pages/_services/storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  createPost(formValue: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private storageService: StorageService) { }

  createNewPost(data: any): Observable<any> {
    const token = this.storageService.getUser().token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(BASIC_URL + `api/posts`, data, { headers });
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts`);
  }

  getPostById(id:number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/` + id);
  }

  getPostByName(id:number, slug:string): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/${id}/${slug}`);
  }

  deletePostById(id: number): Observable<any> {
    const token = this.storageService.getUser().token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(BASIC_URL + `api/posts/delete/` + id, { headers });
  }

  editPostById(id: number, data: any): Observable<any> {
    const token = this.storageService.getUser().token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(BASIC_URL + `api/posts/edit/${id}`, data, { headers });
  }
}
