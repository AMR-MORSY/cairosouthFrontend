import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class NotificationComponent implements OnInit {



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
