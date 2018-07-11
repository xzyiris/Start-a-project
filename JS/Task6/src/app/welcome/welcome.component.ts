import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post
    ('/carrots-admin-ajax/a/login/', null, {params: {name: 'admin', pwd: '123456'}})
      .subscribe(results => {console.log(results); } );
  }
}

