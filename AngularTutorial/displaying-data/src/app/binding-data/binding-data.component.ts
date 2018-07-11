import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-binding-data',
  templateUrl: './binding-data.component.html',
  styleUrls: ['./binding-data.component.css']
})
export class BindingDataComponent implements OnInit {
  @Input() myHero: string;
  constructor() { }

  ngOnInit() {
  }


}
