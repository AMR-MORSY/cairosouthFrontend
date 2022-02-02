import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private _Router:Router) { }
  public goToHome()
  {
    this._Router.navigate(['/home'])

  }

  ngOnInit(): void {
  }

}
