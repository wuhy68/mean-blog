import { Component, OnInit, Inject, Injectable} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private api: AppService,
              private router: Router,
              private routeData: ActivatedRoute) {
    storage.remove('root');
    storage.remove('username');
  }

  username = new FormControl('');
  password = new FormControl('');
  flag = 1;

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.username.value === 'agenda') {
      if (this.password.value === '12345678') {
        this.router.navigate(['/agenda']).then(err => console.log(err));
      } else {
        this.flag = 0;
        this.password.setValue('');
      }
    } else {
      this.api.getAllUserData().subscribe( data => {
        for (const user of data) {
          if (user.username === this.username.value) {
            if (user.password === this.password.value) {
              this.storage.set('username', this.username);
              this.router.navigate(['/blog/1']).then(err => console.log(err));
            } else {
              this.flag = 0;
              this.password.setValue('');
            }
          }
        }
      });
    }

  }
}
