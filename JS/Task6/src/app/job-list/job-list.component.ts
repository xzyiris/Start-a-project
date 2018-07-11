import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor() { }

  expericen = [
    '全部',
    '应届',
    '1~2年',
    '3~5年',
    '6~9年',
    '10年及以上'
  ];
  edu = [
    '大专',
    '本科',
    '硕士',
    '博士及以上',
  ];
  category = [
    '全部',
    '产品',
    '运营',
    '技术',
    '设计',
    '测试'
  ]
  sub = [
    '全部',
    '产品经理',
    'JAVA',
    'iOS',
    'Android',
    'Web前端',
    '运维',
    'UI设计',
    '功能测试'
  ];
  salary = [
    '全部',
    '8k以下',
    '8~15k',
    '16~25k',
    '25k以上'
  ];
  status = [
    '上架',
    '下架'
  ]
  ngOnInit() {
  }

}
