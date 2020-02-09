import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl, Validators } from '@angular/forms';
import { blogModel } from '../model/blogModel';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Api interface
  constructor(@Inject(SESSION_STORAGE) public storage: StorageService,
              private api: AppService,
              private routeData: ActivatedRoute,
              private router: Router) {
  }

  Search = new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]);
  // blog data
  blogData: blogModel;

  ngOnInit() {

  }

  onSubmit(): void {
    this.api.getAllBlogData().subscribe( data => {
      for (const article of data) {
        if (article.title === this.Search.value) {
          this.blogData = article;
          this.router.navigate(['article', this.blogData.title]).then(err => console.log(err));

        }
      }
    });
  }

  signOut() {
    this.storage.remove('root');
    this.storage.remove('username');
    this.router.navigate(['']).then(err => console.log(err));
  }

}
