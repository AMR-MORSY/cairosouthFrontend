import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  public user=new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {
    this.get_User();
   }

  private get_User()
  {
    let storage:any=localStorage.getItem('user')
    if (storage!=null)
    {
      this.user.next(JSON.parse(storage) )
    }
  }
  getAllUsers(id:any, token:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/showUsers/${id}/${token}`)

  };
  getAllUsersPagination(id:any, token:any, new_page:any):Observable<any>
  {
    return this._HttpClient.get(`https://cairo-south.herokuapp.com/api/showUsers/${id}/${token}?page=${new_page}`)

  };

  updateUser(data:any)
  {
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/updateUser",data)


  }

  deleteUser(data:any)
  {
    return this._HttpClient.post("https://cairo-south.herokuapp.com/api/deleteUser",data)


  }
}
