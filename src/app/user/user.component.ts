import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Component, OnInit,AfterViewInit} from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import jwt_decode from "jwt-decode";
import { SitesService } from '../sites/sites.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,AfterViewInit {
  public offices:any;
  public BSCs:any=[];
  public RNCs:any=[];
  public sites_categories:any;
  public sites_types:any;
  public sites_severity:any;
  public fadefinished:boolean=false;


  constructor(private _AuthService:AuthenticationService, private _siteServices:SitesService, private _Router:Router) { }

  private showBSCDetails(BSC:any)
  {
    
    for(var i=0;i<BSC.length-10;i++)
    {
      this.BSCs.push(BSC[i])

    }
   this.BSCs.push(BSC[12])
   this.BSCs.push(BSC[14])
    for(var i=5;i<BSC.length-3;i++)
    {
      this.RNCs.push(BSC[i])
    }
    this.RNCs.push(BSC[13])
    console.log(this.BSCs);
    console.log(this.RNCs)
    
  }
  public getSitesStatestics(token:any)
  {
    this._siteServices.showStatistics(token).subscribe((response:any)=>{
      console.log(response)
      this.offices=Object.entries(response.offices);
     let BSC=Object.entries(response.BSCs) ;
      this.sites_categories=Object.entries(response.sites_categories);
      this.sites_severity=Object.entries(response.sites_severity);
      this.sites_types=Object.entries(response.sites_types);

      console.log(BSC);
      this.showBSCDetails(BSC);
     
     








    });

  }



  ngOnInit(): void {

    if (this._AuthService.currentUser.getValue() != null) {
      let token: any = this._AuthService.currentUser.getValue();

      this.getSitesStatestics(token)


    }
    else {
      this._Router.navigate(['/home']);



    }
  }

  ngAfterViewInit(): void {
    // let x:any= document.getElementById('loading');
  //  x.classList.add("animate__animated","animate__fadeOut");
  //  setTimeout(() => {
    //  this.fadefinished=true;
  //  },3000);
 }



}
