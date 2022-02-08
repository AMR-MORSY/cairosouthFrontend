import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import jwt_decode from "jwt-decode";
import { ModificationsService } from '../modifications.service';

@Component({
  selector: 'app-update-modification',
  templateUrl: './update-modification.component.html',
  styleUrls: ['./update-modification.component.scss']
})
export class UpdateModificationComponent implements OnInit {
  datePickerConfig?: Partial<BsDatepickerConfig>;
  public requestdatepicker: any;
  public finishdatepicker: any;
  public oldSite:any;
  public site_code:any;
  public site_name:any;
  public token:any;
  public id:any;
  public oldModification:any;
  public modification_id:any;
  public subcontractor:any;
  public requester:any;
  public status:any;
  public request_date:any;
  public finish_date:any;
  public cost:any;
  public materials:any;
  public action:any;
  public project:any;

  public createModForm=new FormGroup({


    "subcontractor":new FormControl(null,[Validators.required]),
    "requester":new FormControl(null,[Validators.required]),
    "status":new FormControl("in progress"),
    "request_date":new FormControl(null,[Validators.required]),
    "finish_date":new FormControl(null),
    "cost":new FormControl(null),
    "materials":new FormControl(null),
    "action":new FormControl(null,[Validators.required]),
    "project":new FormControl(null,[Validators.required]),



  })
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



  private sendNewModTODB(mod:any,token:any,id:any)
  {
    let data = {
      'mod': mod,
      "token": token,
      "id": id
    }
    this._ModificationService.updateSiteModification(data).subscribe((response:any)=>{
      console.log(response);
      if (response.message=="success")
      {
        alert ("Modification inserted Successfully")
        this._Router.navigate(['/modifications/show-site-modifications'])
      }
      else
      {
        let error=response.errors;
        alert(JSON.stringify(error));
      }
    })


  }

  constructor(public datepipe: DatePipe,private _ModificationService:ModificationsService, private _AuthServices: AuthenticationService, private _Router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'YYYY-MM-DD' }, { isAnimated: true });
   }

  public submitCreateModificationForm(data:any)
  {
    let createdMod: any = data.value;

    let newRequestdate=this.datepipe.transform(this.requestdatepicker, 'yyyy-MM-dd');
    let newFinishdate=this.datepipe.transform(this.finishdatepicker, 'yyyy-MM-dd')
    createdMod.request_date = newRequestdate;
    createdMod.finish_date = newFinishdate;
    createdMod.mod_id=this.modification_id;
    console.log(createdMod);

    createdMod = JSON.stringify(createdMod);


    this.sendNewModTODB(createdMod, this.token, this.id);



  }
  private getMod() {
    this._ModificationService.modification.subscribe(() => {
       this.oldModification=this._ModificationService.modification.getValue()
       console.log(this.oldModification)
       this.modification_id  =this.oldModification.id;
       this.site_code=this.oldModification.site_code;
       this.site_name=this.oldModification.site_name;
       this.subcontractor=this.oldModification.subcontractor;
       this.request_date=this.oldModification.request_date;
       this.finish_date=this.oldModification.finish_date;
       this.requester=this.oldModification.requester;
       this.project=this.oldModification.project;
       this.status=this.oldModification.status;
       this.cost=this.oldModification.cost;
       this.materials=this.oldModification.materials;
       this.action=this.oldModification.action;


    })
  }

  ngOnInit(): void {
    this.getMod();

    this.getUserData();
  }



}
