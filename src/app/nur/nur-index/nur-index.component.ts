import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { NurService } from '../nur.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-nur-index',
  templateUrl: './nur-index.component.html',
  styleUrls: ['./nur-index.component.scss']
})
export class NurIndexComponent implements OnInit {
  public token:any;
  public years:any;
  public months:any;
  public weeks:any;
  public selectedYear:any;
  public selectedMonth:any;
  public selectedWeek:any;
  public techMonths:any;
  public techWeeks:any;
  public showWeekForm:boolean=false;
  public showMonthForm:boolean=false;
  public months_year:any;
  public weeks_year:any;
  public technologies:any;

  public isError:boolean=false;
  public error:any='';
  public isTokenExpired:boolean=false;


  public indexFormMonth:any;
  public id:any;


  constructor(private _AuthServices: AuthenticationService,private _NURService: NurService,private _Router:Router) { }

public submityear(e:any)
{
  this.selectedYear=e.target.value;
  this.months=Object.getOwnPropertyDescriptor(this.months_year,this.selectedYear);
  this.months=this.months.value;
  this.weeks=Object.getOwnPropertyDescriptor(this.weeks_year,this.selectedYear);
  this.weeks=this.weeks.value;


}
public submitmonth(e:any)
{
  this.selectedMonth=e.target.value;
 let month:any= Object.getOwnPropertyDescriptor(this.techMonths,this.selectedYear);
 month=month.value;
this.technologies= Object.getOwnPropertyDescriptor(month,this.selectedMonth);
this.technologies=this.technologies.value

}
public submitWeek(e:any)
{
  this.selectedWeek=e.target.value;
  let week:any=Object.getOwnPropertyDescriptor(this.techWeeks,this.selectedYear);
  week=week.value;
  this.technologies= Object.getOwnPropertyDescriptor(week,this.selectedWeek);
  this.technologies= this.technologies.value;



}
public closeErrorNotification(data: any) {
  this.isError = data;

}
public closeTokenExpirationNotification(data:any)
{
  this. isTokenExpired=data;
  localStorage.clear();
  this._Router.navigate(['/auth/login']);


}
 public submitIndexFormMonth(Form:any)
  {

    let data=Form.value;
    console.log(data);
    this._NURService.getAllNUR(data,this.token).subscribe((response)=>{

      if (response.message == "token expired, please login") {
        this.error="token expired, please login";
        this.isTokenExpired=true;
        this.isError = false;

      }
    else if (response.message=='success')
    {
      this.isError=false;
      this.isTokenExpired=false
      let statestics:any=response.statestics;
      console.log(statestics);
      this.SendNURTOShowComponent(statestics,data);

    }
    else
    {
      let error=response.errors
      error=JSON.stringify(error)
      this.error=error;
      this.isError=true;
      this.isTokenExpired=false;


      // alert(response.errors)
    }
      this.indexFormMonth=new FormGroup({
        year:new FormControl(null,[Validators.required]),
       month:new FormControl(0,[Validators.required]),
       tech:new FormControl(null,[Validators.required]),
       week:new FormControl(0,[Validators.required]),
     })


    });


  }
  public submit(e:any)
  {
    let value=e.target.value;

    if(value=='month')
    {
      this.showMonthForm=true;
      this.showWeekForm=false;
    }
    else
    {
      this.showMonthForm=false;
      this.showWeekForm=true;

    }
  }
 public SendNURTOShowComponent(statestics:any,data:any)
  {
    this._NURService.NUR.next(statestics);
    this._NURService.NURIndex.next(data);
    this._Router.navigate(['/nur/show-nur']);

  }
  private decodeToken(token: any) {
    let decToken = jwt_decode(token);
    return decToken;

  }

  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      if(this._AuthServices.currentUser.getValue()!=null)
      {
        this.token = this._AuthServices.currentUser.getValue();
        let decToken: any = this.decodeToken(this.token);
        this.id = decToken.id;

      }


    })
  }


  public export(data:any)

  {
    let fileName='';
    let siteType=data;
    if (data=='NDL')
    {
       fileName ="NDLSitesNUR.xlsx";

    }
    else 
    {
       fileName='vipSitesNUR.xlsx'
    }

    this._NURService.download_NDL_VIP_NUR({ 'filename': fileName },this.id,siteType, this.token).subscribe((data) => {

      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), fileName)

    });

  }
  private getNURIndex()
  {
    this._NURService.getNURIndex(this.token).subscribe((response:any)=>{
      console.log(response);
      if (response.message == "token expired, please login") {
        localStorage.clear();
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);

      }
      else if (response.message=='success')
      {
        this.years=response.index.years;
        this.months_year= response.index.months_year;
        this.weeks_year=response.index.weeks_year;
        this.techMonths=response.index.technlogies_month;
        this.techWeeks=response.index.technlogies_week;


      }
      else{
        let error=response.errors;
        alert(error);
      }
    })

  }

  ngOnInit(): void {
    this.getUserData();
    this.getNURIndex();
    this.indexFormMonth=new FormGroup({
      year:new FormControl(null,[Validators.required]),
      month:new FormControl(0,[Validators.required]),
      tech:new FormControl(null,[Validators.required]),
      week:new FormControl(0,[Validators.required]),
    })

  }



}
