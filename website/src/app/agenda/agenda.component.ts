import { Component, OnInit, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { AppService } from '../app.service';

import { blogModel } from '../model/blogModel';
import {commentModel} from '../model/commentModel';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private api: AppService) { }
  // page control
  blogPage = true;
  commentPage = false;
  // blog pagination
  currentBlogPage = 1;
  blogPageNumber: number;
  blogPageArray: number[];
  // comment pagination
  currentCommentPage = 1;
  commentPageNumber: number;
  commentPageArray: number[];
  // blog data
  blogData: blogModel[];
  // comment data
  commentData: commentModel[];
  allCommentData: commentModel[];
  blogCommentData: commentModel[];
  changeCommentData: any;
  changeBlogData: any;

  ngOnInit() {
    this.storage.set('root', 'agenda');
    this.getBlogData(this.currentBlogPage);
    this.getCommentData();
  }

  getBlogData(page) {
    this.api.getAllBlogData().subscribe(data => {
      this.blogPageNumber = Math.ceil(data.length / 3);
      this.blogPageArray = new Array(this.blogPageNumber);
      for (let i = 0; i < this.blogPageNumber; i++) {
        this.blogPageArray[i] = i + 1;
      }
      if (page * 3 <= data.length) {
        this.blogData = data.slice((page - 1) * 3, page * 3);
      } else {
        this.blogData = data.slice((page - 1) * 3, data.length);
      }
    });
  }

  getCommentData() {
    this.api.getAllCommentData().subscribe(data => {
      this.allCommentData = data;
    });
  }

  viewComment(blog: blogModel) {
    this.blogPage = false;
    this.commentPage = true;
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data;
      this.commentData = this.commentData.filter(x => x.blog === blog.title);
      this.blogCommentData = this.commentData;
      this.commentPageNumber = Math.ceil(this.commentData.length / 4);
      this.commentPageArray = new Array(this.commentPageNumber);
      for (let i = 0; i < this.commentPageNumber; i++) {
        this.commentPageArray[i] = i + 1;
      }
      if (this.currentCommentPage * 4 <= this.commentData.length) {
        this.commentData = this.commentData.slice((this.currentCommentPage - 1) * 4, this.currentCommentPage * 4);
      } else {
        this.commentData = this.commentData.slice((this.currentCommentPage - 1) * 4, this.commentData.length);
      }
    });
    this.storage.set('comment', 'blog');
  }

  hideComment(comment) {
    this.changeCommentData = {
      _id: comment._id,
      status: false
    };
    this.api.changeCommentData(this.changeCommentData).subscribe(data => {
      console.log(data);
    });
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data.filter(x => x.blog === comment.blog);
    });
  }

  recoverComment(comment) {
    this.changeCommentData = {
      _id: comment._id,
      status: true
    };
    this.api.changeCommentData(this.changeCommentData).subscribe(data => {
      console.log(data);
    });
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data.filter(x => x.blog === comment.blog);
    });
  }

  hideBlog(blog) {
    this.changeBlogData = {
      _id: blog._id,
      status: false
    };
    this.api.changeBlogData(this.changeBlogData).subscribe(data => {
      console.log(data);
    });
    this.getBlogData(this.currentBlogPage);
  }

  recoverBlog(blog) {
    this.changeBlogData = {
      _id: blog._id,
      status: true
    };
    this.api.changeBlogData(this.changeBlogData).subscribe(data => {
      console.log(data);
    });
    this.getBlogData(this.currentBlogPage);
  }

  blogToComment() {
    this.blogPage = false;
    this.commentPage = true;
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data;
      this.commentPageNumber = Math.ceil(this.commentData.length / 4);
      this.commentPageArray = new Array(this.commentPageNumber);
      for (let i = 0; i < this.commentPageNumber; i++) {
        this.commentPageArray[i] = i + 1;
      }
      if (this.currentCommentPage * 4 <= this.commentData.length) {
        this.commentData = this.commentData.slice((this.currentCommentPage - 1) * 4, this.currentCommentPage * 4);
      } else {
        this.commentData = this.commentData.slice((this.currentCommentPage - 1) * 4, this.commentData.length);
      }
    });
    this.storage.set('comment', 'all');
  }

  commentToBlog() {
    this.blogPage = true;
    this.commentPage = false;
  }

  changeBlogPage(page) {
    this.currentBlogPage = page;
    this.getBlogData(this.currentBlogPage);
  }

  changeCommentPage(page) {
    this.currentCommentPage = page;
    if (this.storage.get('comment') === 'all') {
      if (this.currentCommentPage * 4 <= this.allCommentData.length) {
        this.commentData = this.allCommentData.slice((this.currentCommentPage - 1) * 4, this.currentCommentPage * 4);
      } else {
        this.commentData = this.allCommentData.slice((this.currentCommentPage - 1) * 4, this.allCommentData.length);
      }
    } else {
      if (this.currentCommentPage * 4 <= this.blogCommentData.length) {
        this.commentData = this.blogCommentData.slice((this.currentCommentPage - 1) * 4, this.currentCommentPage * 4);
      } else {
        this.commentData = this.blogCommentData.slice((this.currentCommentPage - 1) * 4, this.blogCommentData.length);
      }
    }

  }
}
