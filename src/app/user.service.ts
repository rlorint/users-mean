import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Response } from './response';
import { User } from './user';

@Injectable()
export class UserService {

  allUsersList: User[];
  constructor(private http: HttpClient) { }

  getUsers(forceRefresh = false): Observable<User[]> {
    console.log(this.allUsersList);
    if(this.allUsersList == undefined || forceRefresh) {
      console.log("Sending a get request for the users");
      return this.http.get<Response>('/test/list.php').pipe(
        map(resp => resp.message),
        tap(resp => this.allUsersList = resp));
    }
    else {
      console.log("I already have the users stored");
      return of(this.allUsersList);
    }
  }

  addUser(userToAdd: User): Observable<Object> {
    return this.http.post('/test/add.php', "name="+userToAdd.name+"&surname="+userToAdd.surname+"&email="+userToAdd.email, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}).pipe(
      tap(resp => console.log(resp))
  );
  }

  getUserById(id: string): Observable<User> {
    console.log("looking for used with id",id);
    return this.getUsers().pipe(
      map(function(users) { return users.filter(user => user.id === id)[0]}),
      tap(resp => console.log(resp)));
  }

  editUser(userToEdit: User): Observable<Object> {
    return this.http.post('/test/edit.php', "name="+userToEdit.name+"&surname="+userToEdit.surname+"&email="+userToEdit.email+"&id="+userToEdit.id, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}).pipe(
      tap(resp => console.log(resp)));
  }

  deleteUser(userToDelete: User): Observable<Object> {
    return this.http.post('/test/delete.php', "id="+userToDelete.id, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}).
    pipe(tap(resp => console.log(resp)));
  }

  search(textToSearch: string, selectedSearchField: string): Observable<User[]> {
    console.log(textToSearch, selectedSearchField);
    return this.getUsers().pipe(
      map(function(users) {return users.filter(user => user[selectedSearchField].toUpperCase() === textToSearch.toUpperCase())}),
      tap(resp => console.log(resp))
    );
  }

  orderDesc(field: string, order: string): Observable<User[]> {
    console.log("!!!",this.allUsersList);
    if(order === 'asc')
        return this.getUsers().pipe(
          map(function(users) {
            return users.sort(function(a,b) {return (a[field].toUpperCase() > b[field].toUpperCase()) ? 1 : ((b[field].toUpperCase() > a[field].toUpperCase()) ? -1 : 0);});}),
          tap(resp => console.log(resp))
        );
    else
        return this.getUsers().pipe(
          map(function(users) {
            return users.sort(function(a,b) {return (a[field].toUpperCase() < b[field].toUpperCase()) ? 1 : ((b[field].toUpperCase() < a[field].toUpperCase()) ? -1 : 0);});}),
          tap(resp => console.log(resp))
        );
      }

}
