
import { AfterViewInit, Component, } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
title="CairoSouth";

ngAfterViewInit(): void {

  let x:any=document.querySelector('loading');
  x.style.display="none";
}



}












function ngOninit() {
  throw new Error('Function not implemented.');
}

