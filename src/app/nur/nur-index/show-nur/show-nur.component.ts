
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NurService } from '../../nur.service';
import { ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-show-nur',
  templateUrl: './show-nur.component.html',
  styleUrls: ['./show-nur.component.scss']
})
export class ShowNurComponent implements OnInit {

  public NUR: any;
  private statestics: any;
  public microwaveNUR: any;
  public avgTicketDur:any;
  public isMicrowaveNur: boolean = false;
  public timeSpan: any;
  public tickets: any;
  public isGenStatestics: boolean = false;
  public totalGenTicketsCount:any;
  public topETGenTicket:any[]=[];
  public topVFGenTicket:any[]=[];
  public topOGGenTicket:any[]=[];
  public topRentGenTicket:any[]=[];



  public BSCChartType: any = 'bar';
  public BSCChartOptions = {
    plugins: {
      legend: {
        position: 'top'

      },
      title: {
        display: true,
        text: 'BSC Analysis',
        align: 'center',
        color: '#ff6600',
        font: { weight: 'bold' }

      }
    },
    responsive: true
  };
  public BSCChartLegend = true;
  public BSCChartData: any;
  public BSCChartLabels: any;


  public genChartType: any = 'bar';
  public genChartOptions = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'gen Analysis',
        align: 'center',
        color: '#ff6600',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public genChartLegend = true;
  public genChartData: any;
  public genChartLabels: any;

  public subsystemChartType: any = 'doughnut';
  public subsystemChartOptions = {
    plugins: {
      legend: {
        position: 'left',

      },
      title: {
        display: true,
        text: 'subsystem Analysis',
        align: 'center',
        color: '#ff6600',
        font: { weight: 'bold' }

      }
    },
    responsive: true
  };
  public subsystemChartLegend = true;
  public subsystemChartData: any;
  public subsystemChartLabels: any;







  constructor(private _NURService: NurService, private _Router: Router) {




  }

  public generateMonths(timeSpan: any) {
    if (timeSpan == 'Month:1')
      this.timeSpan = 'January'
    else if (timeSpan == 'Month:2')
      this.timeSpan = 'February';
    else if (timeSpan == "Month:3")
      this.timeSpan = 'March';
    else if (timeSpan == "Month:4")
      this.timeSpan = 'April';
    else if (timeSpan == "Month:5")
      this.timeSpan = 'May';
    else if (timeSpan == "Month:6")
      this.timeSpan = 'June';
    else if (timeSpan == "Month:7")
      this.timeSpan = 'July';
    else if (timeSpan == "Month:8")
      this.timeSpan = 'August';
    else if (timeSpan == "Month:9")
      this.timeSpan = 'September';
    else if (timeSpan == "Month:10")
      this.timeSpan = 'October';
    else if (timeSpan == "Month:11")
      this.timeSpan = 'November';
    else if (timeSpan == "Month:12")
      this.timeSpan = 'December';
    else
      this.timeSpan = timeSpan;




  }

  private analyze(data: any) {
    let names: any = Object.keys(data);
    let chartLabels: any = names;
    let TotalTickets = [];
    let NUR = [];
    let AvgTicketDur = [];
    for (var i = 0; i < names.length; i++) {
      let tickets = Object.getOwnPropertyDescriptor(data, names[i])?.value;
      let numberTickets: any = tickets['No.tickets'];
      let sumNur: any = tickets['sum_nur'];
      let ticketDur = tickets['average_tickets_duration'];
      NUR.push(sumNur);
      AvgTicketDur.push(ticketDur);
      TotalTickets.push(numberTickets);
    }
    let analysis: any = {};
    return analysis = {
      chartLabels: chartLabels,
      NUR: NUR,
      AvgTicketDur: AvgTicketDur,
      TotalTickets: TotalTickets
    }

  }


  public analyzeBSC() {
    let BSC: any = this.statestics.BSC;
    this.BSCChartLabels = this.analyze(BSC).chartLabels;
    console.log(this.BSCChartLabels);
    console.log(this.analyze(BSC).TotalTickets);
    console.log(this.analyze(BSC).NUR);
    console.log(this.analyze(BSC).AvgTicketDur)
    this.BSCChartData = [
      { data: this.analyze(BSC).TotalTickets, label: 'Tickets', backgroundColor: 'orange' },
      { data: this.analyze(BSC).NUR, label: 'NUR', backgroundColor: 'rgb(54, 162, 235)' },



    ]




  }

  private getMicrowaveNur(subsystem: any) {
    let microwave = subsystem['MW PDH E'];
    if (microwave != null) {
      this.microwaveNUR = microwave.sum_nur;
      this.isMicrowaveNur = true
    }
    else {
      this.microwaveNUR = '';
      this.isMicrowaveNur = false;
    }

    console.log(microwave);

  }
  private getTotalNUR() {
    this.NUR = this.statestics.Nur;

  }
  private getTotalTickets() {
    this.tickets = this.statestics.No_tickets;

  }

  private analyzeSubsystem() {
    let subSystem: any = this.statestics.sub_system;
    console.log(subSystem);
    this.getMicrowaveNur(subSystem);
    this.subsystemChartLabels = this.analyze(subSystem).chartLabels;
    console.log(this.subsystemChartLabels);
    console.log(this.analyze(subSystem).TotalTickets);
    console.log(this.analyze(subSystem).NUR);
    console.log(this.analyze(subSystem).AvgTicketDur)
    this.subsystemChartData = [
      // { data: this.analyze(subSystem).TotalTickets, label: 'Tickets', backgroundColor: 'orange' },
      { data: this.analyze(subSystem).NUR, label: 'NUR' },
    ]

  }

  private getTimeSpan() {

    this.timeSpan = this.statestics.time_span;
    this.generateMonths(this.timeSpan);

  }

  private analyzeGenerator() {

    let genStatestics: any = this.statestics.Generator_statestic;
    if (genStatestics == null) {
      this.isGenStatestics = false;

    }
    else {
      let vendors:any[]=[];
      let count_tickets:any[]=[];
      let NUR:any[]=[];
      this.isGenStatestics = true;
      this.totalGenTicketsCount=genStatestics.No_Gen_tickets;
      let ET_Tickets=genStatestics.count_ET_Gen_tickets;
      if(ET_Tickets!=0)
      {
        vendors.push('ET');
        count_tickets.push(ET_Tickets);
        NUR.push(genStatestics.total_ET_Gen_Nur);
        this.topETGenTicket=genStatestics. top_ET_Nur_tickets;
      }
      let VF_Tickets=genStatestics.count_VF_Gen_tickets;
      if(VF_Tickets!=0)
      {
        vendors.push('VF');
        count_tickets.push(VF_Tickets);
        NUR.push(genStatestics.total_VF_Gen_Nur);
        this.topVFGenTicket=genStatestics. top_VF_Nur_tickets;
      }
      let OG_Tickets=genStatestics.count_OG_Gen_tickets;
      if(OG_Tickets!=0)
      {
        vendors.push('OG');
        count_tickets.push(OG_Tickets);
        NUR.push(genStatestics.total_OG_Gen_Nur);
        this.topOGGenTicket=genStatestics. top_OG_Nur_tickets;
      }
      let Rent_Tickets=genStatestics.count_Rent_Gen_tickets;
      if(Rent_Tickets!=0)
      {
        vendors.push('Rent');
        count_tickets.push(Rent_Tickets);
        NUR.push(genStatestics.total_Rent_Gen_Nur);
        this.topRentGenTicket=genStatestics. top_Rent_Nur_tickets;
      }
      this.genChartLabels=vendors;
      this.genChartData=[{
        data:count_tickets,label:'Number of tickets',backgroundColor: 'orange'},
        {data:NUR,label:'NUR',backgroundColor: 'rgb(54, 162, 235)'}
      ]


    }
  }

  private getAvgTicketDur()
  {
    this.avgTicketDur=this.statestics.average_tickets_duration

  }


  // No_Gen_tickets: 8
  // count_ET_Gen_tickets: 1
  // count_OG_Gen_tickets: 6
  // count_Rent_Gen_tickets: 0
  // count_VF_Gen_tickets: 1
  // top_ET_Nur_tickets: [{… }]
  // top_OG_Nur_tickets: [{… }]
  // top_Rent_Nur_tickets: []
  // top_VF_Nur_tickets: [{… }]
  // total_ET_Gen_Nur: "0.08"
  // total_Gen_Nur: "1.98"
  // total_OG_Gen_Nur: "1.76"
  // total_Rent_Gen_Nur: "0.00"
  // total_VF_Gen_Nur: "0.14"


  private getNURStatestics() {
    this.getTimeSpan();
    this.getTotalNUR();
    this.getTotalTickets();
    this.getAvgTicketDur();
    this.analyzeBSC();
    this.analyzeSubsystem();
    this.analyzeGenerator();






  }

  private getNUR() {
    this._NURService.NUR.subscribe(() => {
      if (this._NURService.NUR.getValue() != null) {
        this.statestics = this._NURService.NUR.getValue();
        this.getNURStatestics();

      }

    })
  }


  ngOnInit(): void {

    this.getNUR();

  }

}
