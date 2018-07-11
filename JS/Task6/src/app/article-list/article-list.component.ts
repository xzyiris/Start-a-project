import { Component, OnInit } from '@angular/core';
import {GetService} from '../get.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  category = [
    '全部',
    '首页Banner',
    '找职位Banner',
    '找精英Banner',
    '行业大图'
  ];
  status = [
    '全部',
    '上线',
    '草稿'
  ];
  articleList = [];
  constructor(private getArticle: GetService) { }

  ngOnInit() {
    this.getArticle.get('/carrots-admin-ajax/a/article/search', this.articleList);
    console.log((this.articleList));
  }

}
