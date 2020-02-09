import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

import { blogModel } from '../model/blogModel';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private api: AppService,
              private routeData: ActivatedRoute) { }

  pageNumber: number;
  pageArray: number[];
  currentPage: number;
  blogData: blogModel[];
  blogData1: blogModel[];
  blogData2: blogModel[];

  flag = true;
  firstCover: blogModel;

  ngOnInit() {
    this.getBlogData(this.routeData.snapshot.params.page);
    this.currentPage = parseInt(this.routeData.snapshot.params.page, 10);
  }

  getBlogData(page): void {
    this.api.getAllBlogData().subscribe(data => {
      // firstCover operation
      this.blogData = data.filter(x => x.status === true);
      // page operation
      this.pageNumber = Math.ceil((this.blogData.length - 1) / 4);
      this.pageArray = new Array(this.pageNumber);
      for (let i = 0; i < this.pageNumber; i++) {
        this.pageArray[i] = i + 1;
      }
      if (data.length === 0) { this.flag = false; }
      this.firstCover = this.blogData[0];
      for (const eachBlog of this.blogData) {
        if (this.firstCover.date < eachBlog.date) {
          this.firstCover = eachBlog;
        }
      }
      this.blogData = this.blogData.filter(x => x !== this.firstCover);
      this.blogData1 = this.blogData.slice((page - 1) * 4, (page - 1) * 4 + 2);
      if (page * 4 <= this.blogData.length) {
        this.blogData2 = this.blogData.slice((page - 1) * 4 + 2, page * 4);
      } else {
        this.blogData2 = this.blogData.slice((page - 1) * 4 + 2, this.blogData.length);
      }
    });
  }
}
