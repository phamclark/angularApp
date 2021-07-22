import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getItemList(){
    return this.httpClient.get(environment.apiURL + '/Restaurant/GetAllItem').toPromise();
  }
}
