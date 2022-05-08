import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-notification',
  templateUrl: './success-notification.component.html',
  styleUrls: ['./success-notification.component.scss']
})
export class SuccessNotificationComponent implements OnInit {



  @Input() successMessage:any='';
  @Output() closeNotification:EventEmitter<boolean>=new EventEmitter();

  constructor() { }


  public close()
  {
    this.closeNotification.emit(false);

  }

  ngOnInit(): void {
  }

}
