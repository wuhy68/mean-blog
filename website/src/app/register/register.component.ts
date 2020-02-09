import { Component, OnInit, Inject, Injectable} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { userModel } from '../model/userModel';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private api: AppService,
              private router: Router) { }

  private userData: userModel[];

  username = new FormControl('');
  password = new FormControl('');
  confirm = new FormControl('');
  same = 1;
  flag = 1;
  postUserData: userModel;

  ngOnInit() {
    this.getAllUserData();
  }

  getAllUserData(): void {
    this.api.getAllUserData().subscribe((data) => {
      this.userData = data;
    });
  }

  onRegister(): void {
    if (this.userData.filter(x => x.username === this.username.value).length === 0) {
      if (this.password.value === this.confirm.value && this.password.value !== '') {
        this.postUserData = {
          username: this.username.value,
          password: this.password.value
        };
        this.api.postUserData(this.postUserData).subscribe(data => {
          console.log(data);
        });
        this.storage.set('username', this.username);
        this.router.navigate(['/blog/1']).then(err => console.log(err));
      } else {
        this.same = 0;
        this.password.setValue('');
        this.confirm.setValue('');
      }
    } else {
      this.flag = 0;
      this.username.setValue('');
      this.password.setValue('');
      this.confirm.setValue('');
    }


  }
}
