import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { blogModel } from '../model/blogModel';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private router: Router,
              private routeData: ActivatedRoute,
              private api: AppService) { }

  username: string;
  blogData: blogModel[];

  ngOnInit() {
    this.checkout();
    this.getBlogData();
  }

  Edit(blog: blogModel) {
    this.storage.set('title', blog.title);
    this.storage.set('description', blog.description);
    this.storage.set('content', blog.content);
    this.storage.set('_id', blog._id);
    this.storage.set('status', 'edit');
    this.router.navigate(['/editor/' + this.storage.get('username').value]).then(err => console.log(err));
  }

  getBlogData() {
    this.api.getAllBlogData().subscribe(data => {
      this.blogData = data;
      this.blogData = this.blogData.filter(x => x.author === this.storage.get('username').value);
    });
  }

  checkout(): void {
    this.username = this.storage.get('username').value;
    if (this.routeData.snapshot.params.user !== this.username) {
      this.router.navigate(['']).then(error => console.log(error));
    }
  }

}
