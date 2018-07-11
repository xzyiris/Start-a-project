import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) {
  }
  get(url: string, articles) {
    this.http.get(url).subscribe(
      data => {
        articles.push(data);
      }
    );
  }
}
