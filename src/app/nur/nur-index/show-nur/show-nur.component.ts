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





  constructor(private _NURService: NurService,private _Router:Router) {




  }




 public getNURStatestics()
 {
   this.NUR=this.statestics.Nur;
   let sub_system=this.statestics.sub_system;
   console.log(sub_system);
   let microwave=sub_system['MW PDH E'];
   this.microwaveNUR=microwave.sum_nur;
   this.timeSpan=this.statestics.time_span
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
