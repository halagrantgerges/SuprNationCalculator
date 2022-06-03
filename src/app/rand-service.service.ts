import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RandServiceService {

  constructor(private http: HttpClient ) { 
    
  }

  getRandValue() {
    return this.http.get<any>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
  }
}
