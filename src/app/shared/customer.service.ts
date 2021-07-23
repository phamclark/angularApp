import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCumstomerList(){
    return this.httpClient.get(environment.apiURL + '/Restaurant/GetAllCustomer').toPromise();
  }
}
