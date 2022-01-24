import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-new-site',
  templateUrl: './create-new-site.component.html',
  styleUrls: ['./create-new-site.component.scss']
})
export class CreateNewSiteComponent implements OnInit {
  datePickerConfig?: Partial<BsDatepickerConfig>;
  public datepicker: any;
  public hidden: boolean = true;
   public createSiteForm = new FormGroup({
     code: new FormControl(null, [Validators.required]),
     site_name: new FormControl(null, [Validators.required]),
     BSC_RNC: new FormControl(null, [Validators.required]),
     office: new FormControl(null, [Validators.required]),
     site_type: new FormControl(null, [Validators.required]),
     site_category: new FormControl(null, [Validators.required]),
    build_date: new FormControl(null,[Validators.required]),
     severity: new FormControl(null, [Validators.required]),
     sharing: new FormControl(null, [Validators.required]),
     host: new FormControl(null, [Validators.required]),

   })

  constructor() {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' }, { dateInputFormat: 'MM-DD-YYYY' }, { isAnimated: true });
  }

  submitCreateSiteForm(data:any) {
    let createdSite:any = data.value;
     let x: any = document.getElementById("datePickerOutput");
     let y: any = x.innerHTML;
     createdSite.build_date=y;





  }

  ngOnInit(): void {

  }

}
