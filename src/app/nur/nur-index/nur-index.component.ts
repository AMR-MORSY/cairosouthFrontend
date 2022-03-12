import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { NurService } from '../nur.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public indexFormMonth:any;
  // public indexFormWeek:any;

  constructor(private _AuthServices: AuthenticationService,private _NURService: NurService,private _Router:Router) { }

public submityear(e:any)
{
  this.selectedYear=e.target.value;
  this.months=Object.getOwnPropertyDescriptor(this.months_year,this.selectedYear)?.value;
  this.weeks=Object.getOwnPropertyDescriptor(this.weeks_year,this.selectedYear)?.value;


}
public submitmonth(e:any)
{
  this.selectedMonth=e.target.value;
 let month= Object.getOwnPropertyDescriptor(this.techMonths,this.selectedYear)?.value;
this.technologies= Object.getOwnPropertyDescriptor(month,this.selectedMonth)?.value;

}
public submitWeek(e:any)
{
  this.selectedWeek=e.target.value;
  let week=Object.getOwnPropertyDescriptor(this.techWeeks,this.selectedYear)?.value;
  this.technologies= Object.getOwnPropertyDescriptor(week,this.selectedWeek)?.value;



}
 public submitIndexFormMonth(Form:any)
  {

    let data=Form.value;
    // data['week']=0;
    console.log(data)
    this._NURService.getAllNUR(data,this.token).subscribe((response)=>{
      console.log(response);
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
 public submitIndexFormWeek(Form:any)
  {

  }

  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      this.token = this._AuthServices.currentUser.getValue();

    })
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
