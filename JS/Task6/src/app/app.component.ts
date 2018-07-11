import { Component } from '@angular/core';
import {log} from 'util';
import {T} from '@angular/core/src/render3';
import {AccordionService} from './accordion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  displays = this.accordion.displays;
  titles = [
    {title: '信息管理', list: ['公司列表', '职位管理']},
    {title: 'Article管理', list: ['Article列表', '文章列表', '文章列表']},
    {title: '用户管理', list: ['用户列表']}
  ]
  i = 0;
  toggles = this.accordion.toggles;
  collapse(index: number) {
    this.accordion.collapse(index);
  }
  constructor(private accordion: AccordionService) {
  }
}
