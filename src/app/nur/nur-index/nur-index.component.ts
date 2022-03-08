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
  public techMonths:any;
  public techWeeks:any;
  public showWeekForm:boolean=false;
  public showMonthForm:boolean=false;
  public months_year:any;
  public weeks_year:any;

  public indexFormMonth:any;
  public indexFormWeek:any;

  constructor(private _AuthServices: AuthenticationService,private _NURService: NurService,private _Router:Router) { }


 public submitIndexFormMonth(Form:any)
  {

  }
  public submit(e:any)
  {
    let value=e.target.value;
    console.log(value);
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
        this.months_year=Object.getOwnPropertyDescriptor(this.months_year,this.years)
        this.weeks_year=Object.entries (response.index.weeks_year);

        // for(var i=0;i<this.years.length;i++)
        // {
        //   let months=this.months_year.filter((month:any)=>{

        //     return month[this.years[i]]
        //   })
        // }
        console.log(this.months_year.value);

        console.log(this.weeks_year);



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
      years:new FormControl(null,[Validators.required]),
      months:new FormControl(null,[Validators.required]),
      techMonths:new FormControl(null,[Validators.required])
    })
    this.indexFormWeek=new FormGroup({
      years:new FormControl(null,[Validators.required]),
      weeks:new FormControl(null,[Validators.required]),
      techWeeks:new FormControl(null,[Validators.required])
    })
  }



}
