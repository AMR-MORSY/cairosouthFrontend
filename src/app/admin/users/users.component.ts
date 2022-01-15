import { AdminService } from './../admin.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _adminService:AdminService) { }

  public uploadedImage=null;

loginForm=new FormGroup({
  name:new FormControl(null)
})

 submitform(loginForm:any)
 {
   console.log(loginForm.value)
   let data={
     'name':loginForm.value.name,
     'image':this.uploadedImage
   }
  //  this._adminService.uploadImage(data).subscribe((response)=>{
    //  console.log(response);
  //  })


 }




 uploadimage(e:any)
 {
   console.log(e.target.files[0])
   this.uploadedImage=e.target.files[0];




 }

  ngOnInit(): void {
  }

}
