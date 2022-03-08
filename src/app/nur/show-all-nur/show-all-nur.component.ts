import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { NurService } from '../nur.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-show-all-nur',
  templateUrl: './show-all-nur.component.html',
  styleUrls: ['./show-all-nur.component.scss']
})
export class ShowAllNurComponent implements OnInit {



  constructor(private _AuthServices: AuthenticationService,private _NURService: NurService) { }





  ngOnInit(): void {
  
  }

}
