import { Directive, HostListener } from '@angular/core';
import { NavigationServiceService } from './navigation-service.service';

@Directive({
  selector: '[appBackNavigation]'
})
export class BackNavigationDirective {

  constructor(private _NavigationService:NavigationServiceService) {

  }
  @HostListener ('click') back(){
    this._NavigationService.back();

  }



}
