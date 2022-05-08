import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/error-notification.component';
import { BackNavigationDirective } from './back-navigation.directive';
import { SuccessNotificationComponent } from './success-notification/success-notification.component';
import { TokenExpireNotificationComponent } from './token-expire-notification/token-expire-notification.component';
import { BackButtonComponentComponent } from './back-button-component/back-button-component.component';



@NgModule({
  declarations: [
    NotificationComponent,
    BackNavigationDirective,
    SuccessNotificationComponent,
    TokenExpireNotificationComponent,
    BackButtonComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NotificationComponent ,BackNavigationDirective,SuccessNotificationComponent,TokenExpireNotificationComponent,BackButtonComponentComponent
  ]
})
export class SharedModuleModule { }
