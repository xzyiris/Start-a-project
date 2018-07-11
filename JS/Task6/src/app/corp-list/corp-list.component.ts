import {Component, OnInit} from '@angular/core';
import {cities} from '../cities';
import {log} from 'util';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-corp-list',
  templateUrl: './corp-list.component.html',
  styleUrls: ['./corp-list.component.css']
})
export class CorpListComponent implements OnInit {
  province = cities
  constructor(private http: HttpClient) {
  }

  bussiness = ['全部', '移动互联网', '电子商务', '企业服务', 'O2O',
    '教育', '金融', '游戏'];
  validStatus = ['全部', '已认证', '未认证'];
  freezeStatus = ['全部', '正常', '冻结'];
  scale = ['无需融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上', '上市公司'];
  selectedProvince;
  selectedCity;
  selectedArea;
  selectedCityIndex;
  cities;
  areas;

  onChangeProvince(event) {
    this.selectedArea = [];
    this.selectedProvince = event.target.value;
    for (let i = 0; i < this.province.length; i++) {
      if (cities[i].name === this.selectedProvince) {
        this.cities = this.province[i].city;
        break;
      }
    }
    this.selectedCity = event.target.value;
    // console.log(this.selectedCity);
    // console.log(this.cities);
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === this.selectedCity) {
        this.areas = this.cities[i].area;
        break;
      }
    }
  }
  onChangeCity(event) {
    this.selectedCity = event.target.value;
    // console.log(this.selectedCity);
    // console.log(this.cities);
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === this.selectedCity) {
        this.areas = this.cities[i].area;
        break;
      }
    }
    // console.log(this.areas);
  }
  ngOnInit() {
    this.http.get
    ('/carrots-admin-ajax/a/article/search')
      .subscribe(results => {console.log(results); } );
  }

}
