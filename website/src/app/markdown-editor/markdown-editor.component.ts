import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { EditorConfig } from '../editor/model/editor-config';
import { AppService } from '../app.service';
import { FormControl, Validators } from '@angular/forms';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';

declare var editormd: any;
@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})
export class MarkdownEditorComponent implements OnInit {

  // ApiService interface
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private api: AppService,
              private router: Router,
              private routeData: ActivatedRoute) { }

  title = new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]);
  description = new FormControl('', [Validators.required, Validators.maxLength(90), Validators.minLength(20)]);
  // Markdown editor config
  conf = new EditorConfig();
  markdown = '';
  medMarkdown = '';
  // Blog data
  blogData: any;
  username: string;

  // Synchronization property content
  syncModel(str): void {
    this.markdown = str;
  }

  ngOnInit() {
    this.checkout();
    this.baseSet();
  }

  onSubmit(): void {
    this.blogData = {
      _id: this.storage.get('_id'),
      title: this.title.value,
      content: this.markdown,
      author: this.storage.get('username').value,
      description: this.description.value
    };
    this.storage.remove('_id');
    if (this.storage.get('status') !== 'edit') {
      this.api.postBlogData(this.blogData).subscribe( data => {
        console.log(data);
      });
      this.router.navigate(['/article/' + this.blogData.title]).then(err => console.log(err));
    } else {
      this.api.updateBlogData(this.blogData).subscribe(data => {
        console.log(data);
      });
      this.storage.remove('status');
      this.router.navigate(['/about/' + this.username]).then(err => console.log(err));
    }
  }

  checkout(): void {
    this.username = this.storage.get('username').value;
    if (this.routeData.snapshot.params.user !== this.username) {
      this.router.navigate(['']).then(err => console.log(err));
    }
  }

  baseSet() {
    if (this.storage.get('status') === 'edit') {
      this.title.setValue(this.storage.get('title'));
      this.description.setValue(this.storage.get('description'));
      this.markdown = this.storage.get('content');
      this.storage.remove('title');
      this.storage.remove('description');
      this.storage.remove('content');
    }
  }


}
