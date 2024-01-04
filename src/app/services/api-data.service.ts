import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  url = 'https://showmywork.in/rest-api.php'

  constructor(private http: HttpClient) { }

  // get all employees data
  getData() {
    return this.http.get(this.url);
  }

  // get single employee data
  getSingle(id: number) {
    return this.http.get(`https://showmywork.in/rest-api.php?id=${id}`)
  }

  // post employee data
  sendData(data: any) {
    return this.http.post(this.url, data);
  }

   updateEmployee(id: number, value: any) {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteEmployee(id: number) {

    return this.http.request('delete', this.url + id)
  }
}
