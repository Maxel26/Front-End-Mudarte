import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inicioCardResponse } from '../interfaces/inicioCards-response.interface';
import { environment } from 'src/environments/environment.development';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  BASE_URL : string = environment.baseUrl ;

  constructor(
    private http : HttpClient
  ) { }

  getCards(){
    return this.http.get<inicioCardResponse>(`${this.BASE_URL}/inicio`)
    .pipe(
      tap((response)=> console.log(response)),
      map((response)=> response['cards'])
    )
  };
}
