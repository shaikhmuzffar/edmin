import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  url = 'https://showmywork.in/rest-api.php'

  constructor(private http:HttpClient) {}
  getData(){
    return this.http.get("https://showmywork.in/rest-api.php");
  }
   sendData(data:any){
    return this.http.post(this.url,data);
   }
}
