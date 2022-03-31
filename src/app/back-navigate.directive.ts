import { NavigationServiceService } from './navigation-service.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackNavigate]'
})
export class BackNavigateDirective {

  constructor(private _NavigationService:NavigationServiceService) {
   
   }
   @HostListener ('click') back(){
     this._NavigationService.back();

   }

}
