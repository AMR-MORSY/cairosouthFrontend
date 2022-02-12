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
  public user_id:any;
  public isUserClicked:boolean=false;

  public goToUpdateUser()
  {

  }
  constructor(private _SuperAdminService:SuperAdminService,private _AuthServices: AuthenticationService, private _Router: Router) { }

public sendUserId(index:any,e:any)
{
  this.user_id=index;
  this.isUserClicked=true;
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

  }
  private displayUsers() {



    this._SuperAdminService.getAllUsers(this.id,this.token).subscribe((response) => {
      console.log(response)
      this.users = [];
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
    this.getUserData();
    this.displayUsers();
  }

}
