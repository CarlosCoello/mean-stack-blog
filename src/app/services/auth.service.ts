import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
domain = "https://eerie-alien-86151.herokuapp.com/";
authToken;
authUser;
options;

  constructor(
    private http: Http
   ) { }

   createAuthHeaders(){
     this.loadToken();
     this.options = new RequestOptions({
       headers: new Headers({
         'Content-Type': 'application/json',
         'authorization': this.authToken
       })
     })
   };

   loadToken(){
     this.authToken = localStorage.getItem( 'token' );
   }

  registerUser( user ){
    return this.http.post( this.domain + 'authentication/register', user ).map( res => res.json() );
  };

  verifyUsername( username ){
    return this.http.get( this.domain + 'authentication/verifyUsername/' + username ).map( res => res.json() );
  };

  verifyEmail( email ){
    return this.http.get( this.domain + 'authentication/verifyEmail/' + email ).map( res => res.json() );
  };

  login( user ) {
    return this.http.post( this.domain + 'authentication/login', user).map( res => res.json() );
  }

  logOut(){
    this.authToken = null;
    this.authUser = null;
    localStorage.clear();
  }

  storeUserData( token, user ){
    localStorage.setItem( 'token', token);
    localStorage.setItem( 'user', JSON.stringify( user ) );
    this.authToken = token;
    this.authUser = user;
  }

  getProfile(){
    this.createAuthHeaders();
    return this.http.get( this.domain + 'authentication/profile', this.options ).map( res => res.json() );
  }

  loggedIn(){
    return tokenNotExpired();
  }

  getPublicProfile(username){
    this.createAuthHeaders();
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map( res => res.json() );
  }




}
