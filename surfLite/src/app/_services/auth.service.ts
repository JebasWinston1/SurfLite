import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  isAuthenticated(): boolean{
    if(localStorage.getItem('token')==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isAuthenticated()){
      this.router.navigate(['/login'])
    }
  }


  register(name: string, email: string, password: string){
    return this.http.post<{idToken: string}>('http://192.168.12.86:3000/signup',{name: name,email,password})
  }
  storeToken(token: string){
    localStorage.setItem('token',token)
    console.log(token);
  }
}
