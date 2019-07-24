import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}
  
  public getUsers() : Observable <User[]> {
    console.log("inside service"); 
    return this.httpClient.get<User[]>(this.url);
  }
  public getUserById(userId){
    return this.httpClient.get<User[]>(this.url + '?id=' +userId);
  }
  public addUser(user:User) :Observable <User>{
    return this.httpClient.post<User>(this.url, user);
  }  
  public deleteUserById(userId){
    return this.httpClient.delete<User>(this.url +userId);
  }
  public updateUser(user:User) : Observable <User>{
    return this.httpClient.put<User>(this.url + user.id, user);
  }
}
