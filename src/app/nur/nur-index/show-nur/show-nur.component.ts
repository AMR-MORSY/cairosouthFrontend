import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NurService } from '../../nur.service';

@Component({
  selector: 'app-show-nur',
  templateUrl: './show-nur.component.html',
  styleUrls: ['./show-nur.component.scss']
})
export class ShowNurComponent implements OnInit {

  public NUR:any;
  public statestics:any;
  public microwaveNUR:any;
  public timeSpan:any;
  public tickets:any;
  





  constructor(private _NURService: NurService,private _Router:Router) {




  }

  public generateMonths(timeSpan:any)
  {
    if (timeSpan=='Month:1')
    this.timeSpan='January'
    else if (timeSpan=='Month:2')
    this.timeSpan='February';
    else if(timeSpan=="Month:3")
    this.timeSpan='March';
    else if (timeSpan=="Month:4")
    this.timeSpan='April';
    else if (timeSpan=="Month:5")
    this.timeSpan='May';
    else if (timeSpan=="Month:6")
    this.timeSpan='June';
    else if (timeSpan=="Month:7")
    this.timeSpan='July';
    else if (timeSpan=="Month:8")
    this.timeSpan='August';
    else if (timeSpan=="Month:9")
    this.timeSpan='September';
    else if (timeSpan=="Month:10")
    this.timeSpan='October';
    else if (timeSpan=="Month:11")
    this.timeSpan='November';
    else if (timeSpan=="Month:12")
    this.timeSpan='December';
    else
    this.timeSpan=timeSpan;
  
  
  

  }



 public getNURStatestics()
 {
   this.NUR=this.statestics.Nur;
   this.tickets=this.statestics.No_tickets;
   let sub_system=this.statestics.sub_system;
   console.log(sub_system);
   let microwave=sub_system['MW PDH E'];
   this.microwaveNUR=microwave.sum_nur;
   this.timeSpan=this.statestics.time_span;
   this.generateMonths(this.timeSpan)
   console.log(microwave);
 }

public getNUR()
{
  this._NURService.NUR.subscribe(()=>{
    if(this._NURService.NUR.getValue()!=null)
    {
      this.statestics=this._NURService.NUR.getValue();
      this.getNURStatestics();

    }

  })
}


  ngOnInit(): void {

    this.getNUR();

  }

}
