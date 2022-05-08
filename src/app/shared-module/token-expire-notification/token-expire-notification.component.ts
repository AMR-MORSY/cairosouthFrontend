import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-token-expire-notification',
  templateUrl: './token-expire-notification.component.html',
  styleUrls: ['./token-expire-notification.component.scss']
})
export class TokenExpireNotificationComponent implements OnInit {


  @Input() errorMessage:any='';
  @Output() closeNotification:EventEmitter<boolean>=new EventEmitter();

  constructor() { }


  public close()
  {
    this.closeNotification.emit(false);

  }

  ngOnInit(): void {
  }

}
