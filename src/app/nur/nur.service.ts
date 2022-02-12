import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NurService {

  public NUR=new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {
    this.getNUR();
  }

  public getNUR()
  {
    let storage:any=localStorage.getItem('NUR');
    if(storage!=null){
      storage=JSON.parse(storage);
      this.NUR.next(storage);

    }




  }


  createNUR(data:any):Observable<any>{
    return this._HttpClient.post("http://cairo-south.herokuapp.com/api/createNUR",data);
  }

}
