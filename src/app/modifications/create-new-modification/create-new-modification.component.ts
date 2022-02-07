import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-modification',
  templateUrl: './create-new-modification.component.html',
  styleUrls: ['./create-new-modification.component.scss']
})
export class CreateNewModificationComponent implements OnInit {

  public createModForm=new FormGroup({

    "site_code":new FormControl(null),
    "site_name":new FormControl(null),
    "subcontractor":new FormControl(null),
    "requester":new FormControl(null),
    "status":new FormControl("in progress"),
    "request-date":new FormControl("in progress"),



  })

  constructor() { }

  public submitCreateModificationForm(formData:any)
  {

  }

  ngOnInit(): void {
  }

}
