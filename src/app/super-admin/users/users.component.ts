import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { SuperAdminService } from '../super-admin.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public id:any;
  public token:any
  public config:any;
  public users:any
  public isDataFound:boolean=false;
  public pagination_link: any;
  public user:any;
  public isUserClicked:boolean=false;

  public goToUpdateUser()
  {
    this._SuperAdminService.user.next(this.user)
    localStorage.setItem('user', JSON.stringify(this.user))
    this._Router.navigate(['/super-admin/update-user'])

  }
  constructor(private _SuperAdminService:SuperAdminService,private _AuthServices: AuthenticationService, private _Router: Router) { }
  private shadeElement(e: any) {

    let elementId: any = e.currentTarget.dataset.index;

    let x: any = document.querySelectorAll('.hambozo');
    for (var i = 0; i < x.length; i++) {
      if (i == elementId) {

        x[i].style.color = "red";
      }
      else {

        x[i].style.color = "black";
      }
    }

  }
  private getSelectedUser(index:any)
  {
    let user=this.users.filter((user:any)=>{

      return user.id==index;

    })
    return user[0];

  }
public sendUserId(index:any,e:any)
{
  this.shadeElement(e)
  this.user=this.getSelectedUser(index)

  this.isUserClicked=true;




}
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      this.token = this._AuthServices.currentUser.getValue();
      let decToken: any = this.decodeToken(this.token);
      this.id = decToken.id;

    })

  }
  public DeleteUser()
  {
    let data={
      'user_id':this.user.id,
      'token':this.token,
      'id':this.id
    }
    this._SuperAdminService.deleteUser(data).subscribe((response:any)=>{
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      if (response.message=='failed')
      {
        let error=response.errors;
        alert(JSON.stringify(error))
      }
      else
      {
        alert('user deleted successfully')
        this.displayUsers()
      }
    })

  }
  private displayUsers() {
    this.getUserData();
    this.users = [];

    this._SuperAdminService.getAllUsers(this.id,this.token).subscribe((response) => {
      console.log(response)

      if (response.data != null) {
        this.users = response.data;
        this.pagination_link = response.links.first;
        console.log(this.users);
        this.config = {
          currentPage: response.meta.curent_page,
          itemsPerPage: response.meta.per_page,
          totalItems: response.meta.total
        }
        this.isDataFound = true;
      }
      else if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else {
        this.isDataFound = false;
      }

    })






  }


  public pageChange(newpage: any) {
    this.config.currentPage = newpage;
    this._SuperAdminService.getAllUsersPagination(this.id,this.token, newpage).subscribe((response:any) => {
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else
      this.users = response.data;
    })


  }
  ngOnInit(): void {

    this.displayUsers();
  }

}
