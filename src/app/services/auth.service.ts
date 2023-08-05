import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string = environment.baseUrl ;
  private _user! : User
  constructor(
    private http : HttpClient
  ) { }


    get user() : User {
      console.log(this._user);
    return {...this._user}
      
    }


  login(email: string, password : string) {
    const
        URL = `${this.baseUrl}/auth/login`,
        body = {email, password} ;

    return this.http.post<AuthResponse>(URL,body)
      .pipe(
        tap( response => {
          console.log(response);
          
          if(response.ok){
            localStorage.setItem('token',response.token!);
          }
        }),
        map( response => response.ok ),
        catchError(err => of({
          ok : false,
          msg : err.error.msg
        }))
      )
   }

   validateToken(){
    const
      token =localStorage.getItem('token') || '' ,
      URL = `${this.baseUrl}/auth/renew`,
      headers = new HttpHeaders().set('x-token',token ) ;

    return this.http.get <AuthResponse>(URL, {headers})
      .pipe(
        tap(response => {
          console.log(response);

          if(response.ok) {
            localStorage.setItem('token', token!);

            this._user = {
              _id : response?.id!,
              name : response?.name!,
              email : response?.email!,
              role : response?.email!
            };
          }
          
        }),
        map(response => response.ok),
        catchError(err => {
          return of(false)
        })
      );
   }

   logout(){
    localStorage.clear();

    this._user = {
      _id : '',
      name : '',
      email : '',
      role : ''
    }
   }
}
