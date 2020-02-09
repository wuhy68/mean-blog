import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import {blogModel} from './model/blogModel';
import {commentModel} from './model/commentModel';
import {userModel} from './model/userModel';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  baseurl = 'http://localhost:4200/api/';

  getAllBlogData() {
    return this.http.get<blogModel[]>(this.baseurl + 'blog');
  }

  postBlogData(data: blogModel) {
    return this.http.post(this.baseurl + 'editor', data);
  }

  updateBlogData(data: blogModel) {
    return this.http.put(this.baseurl + 'editor', data);
  }

  changeBlogData(data: blogModel) {
    return this.http.put(this.baseurl + 'blog', data);
  }

  getAllUserData() {
    return this.http.get<userModel[]>(this.baseurl + 'user');
  }

  postUserData(data: userModel) {
    return this.http.post(this.baseurl + 'user', data);
  }

  getAllCommentData() {
    return this.http.get<commentModel[]>(this.baseurl + 'comment');
  }

  postCommentData(data: commentModel) {
    return this.http.post(this.baseurl + 'comment', data);
  }

  changeCommentData(data: commentModel) {
    return this.http.put(this.baseurl + 'conceal', data);
  }

  updateCommentData(data: commentModel) {
    return this.http.put(this.baseurl + 'comment', data);
  }

}
