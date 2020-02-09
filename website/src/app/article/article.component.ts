import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorConfig } from '../editor/model/editor-config';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { FormControl } from '@angular/forms';

import {blogModel} from '../model/blogModel';
import {commentModel} from '../model/commentModel';

declare var editormd: any;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private api: AppService,
              private routeData: ActivatedRoute,
              private router: Router) {
  }

  username: string;
  commentInput = 0;
  // blog data
  blogData: blogModel;
  // comment data
  commentData: commentModel[];
  updateCommentData: any;
  submitComment: any;
  // formControl
  comment = new FormControl('');
  commentEdit = new FormControl('');
  // editorMd config
  conf = new EditorConfig();
  // ApiService interface
  ngOnInit() {
    this.loadArticle();
    this.loadComment();
    this.username = this.storage.get('username').value;
  }

  loadArticle(): void {
    this.api.getAllBlogData().subscribe( data => {
      for (const article of data) {
        if (article.title === this.routeData.snapshot.params.title) {
          this.blogData = article;
          if (this.blogData.status === true) {
            this.conf.markdown = this.blogData.content;
            editormd.markdownToHTML('md', this.conf);
            break;
          } else {
            this.conf.markdown = '该博客已被管理员隐藏';
            editormd.markdownToHTML('md', this.conf);
            break;
          }

        }
      }
    });
  }

  loadComment(): void {
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data;
      this.commentData = this.commentData.filter(x => x.blog === this.routeData.snapshot.params.title);
    });
  }

  editComment(comment) {
    this.updateCommentData = {
      _id: comment._id,
      comment: this.commentEdit.value
    };
    this.api.updateCommentData(this.updateCommentData).subscribe(data => {
      console.log(data);
    });
    this.api.getAllCommentData().subscribe(data => {
      this.commentData = data;
      this.commentData = this.commentData.filter(x => x.blog === this.routeData.snapshot.params.title);
    });
    this.commentInput = 0;
  }

  onSubmit() {
    if (this.storage.get('username').value === '') {
      this.router.navigate(['']).then(err => console.log(err));
    } else {
      this.submitComment = {
        blog: this.routeData.snapshot.params.title,
        comment: this.comment.value,
        from: this.storage.get('username').value,
        to: this.blogData.author
      };
      this.api.postCommentData(this.submitComment).subscribe(data => {
        console.log(data);
        this.loadComment();
        this.comment.setValue('');
      });
    }
  }

  change(comment) {
    this.commentInput = 1;
    this.commentEdit.setValue(comment.comment);
  }
}
