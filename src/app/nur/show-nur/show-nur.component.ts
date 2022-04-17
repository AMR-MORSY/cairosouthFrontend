
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NurService } from '../nur.service';
import {saveAs} from 'file-saver';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AuthenticationService } from 'src/app/auth/authentication.service';



@Component({
  selector: 'app-show-nur',
  templateUrl: './show-nur.component.html',
  styleUrls: ['./show-nur.component.scss']
})
export class ShowNurComponent implements OnInit {

  public NUR: any;
  private statestics: any;
  public microwaveNUR: any;
  public avgTicketDur: any;
  public BSCs:any[]=[];
  public isMicrowaveNur: boolean = false;
  public timeSpan: any;
  public tickets: any;
  public isGenStatestics: boolean = false;
  public totalGenTicketsCount: any;
  public totalGenTicketsNUR: any;
  public topETGenTicket: any[] = [];
  public topVFGenTicket: any[] = [];
  public topOGGenTicket: any[] = [];
  public topRentGenTicket: any[] = [];
  public VIPs:any[]=[];
  public chartPlugins = [pluginDataLabels.default];
  public repeatedSites:any[]=[];
  public topSitesNUR:any[]=[];
  private NURIndex:any=null;
  private token:any;


  public BSCChartType: any = 'bar';
  public BSCChartOptions = {
    scales: {
      yAxis: {
        grid: {
          tickWidth: 1,
          tickColor: 'blue',
          borderColor: 'red',

        },
        ticks: {
          color: 'red'
        },
      },
      xAxis: {
        grid: {
          tickWidth: 1,
          tickColor: 'blue',
          borderColor: 'red',

        },
        ticks: {
          color: 'red'
        },
      }
    },
    plugins: {
      legend: {
        position: 'top'

      }

    },
    responsive: true
  };
  public BSCChartLegend = true;
  public BSCChartData: any;
  public BSCChartLabels: any;


  public genChartType: any = 'bar';
  public genChartOptions = {
    scales: {
      yAxis: {
        grid: {
          tickWidth: 1,
          tickColor: 'blue',
          borderColor: 'red'
        },
        ticks: {
          color: 'red'
        },
      },
      xAxis: {
        grid: {
          tickWidth: 1,
          tickColor: 'blue',
          borderColor: 'red'
        },
        ticks: {
          color: 'red'
        },
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },

    },
    responsive: true
  };
  public genChartLegend = true;
  public genChartData: any;
  public genChartLabels: any;

  public subsystemChartType: any = 'doughnut';
  public subsystemChartOptions:any;
  public subsystemChartLegend = true;
  public subsystemChartData: any;
  public subsystemChartLabels: any;







  constructor(private _NURService: NurService, private _Router: Router,private _AuthServices:AuthenticationService) {

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
    let BSCs:any[]=[];
    for (var i = 0; i < names.length; i++) {
      let tickets = Object.getOwnPropertyDescriptor(data, names[i])?.value;
      let numberTickets: any = tickets['No.tickets'];
      let sumNur: any = tickets['sum_nur'];
      let ticketDur = tickets['average_tickets_duration'];
      let topSiteNur=tickets['top_site_nur'][0];

      let BSC:any={
        'name':names[i],
        'ticketDur':ticketDur,
        'topSiteNur': topSiteNur
      }
      BSCs.push(BSC);
      NUR.push(sumNur);
      AvgTicketDur.push(ticketDur);
      TotalTickets.push(numberTickets);
    }
    let analysis: any = {};
    return analysis = {
      chartLabels: chartLabels,
      NUR: NUR,
      BSCs:BSCs,
      AvgTicketDur: AvgTicketDur,
      TotalTickets: TotalTickets
    }

  }

public goToShowSiteNUR(siteCode:any)
{
  console.log(siteCode)
  this._NURService.site_code.next(siteCode);
  localStorage.setItem('site_code',siteCode);
  this._Router.navigate(['/nur/show-site-nur'])
}

  public analyzeBSC() {
    let BSC: any = this.statestics.BSC;
    console.log(BSC)
    this.BSCChartLabels = this.analyze(BSC).chartLabels;
    console.log(this.BSCChartLabels);
    console.log(this.analyze(BSC).TotalTickets);
    console.log(this.analyze(BSC).NUR);
    console.log(this.analyze(BSC).AvgTicketDur);
    console.log(this.analyze(BSC).BSCs)
    this.BSCs=this.analyze(BSC).BSCs;
    this.BSCChartData = [
      {
        data: this.analyze(BSC).TotalTickets, label: 'Tickets', backgroundColor: 'orange',
        yAxisID: 'yAxis', xAxisID: 'xAxis', maxBarThickness: 25,
        minBarLength: 10, borderColor: 'red', borderWidth: 1, borderRadius: 2, pointStyle: 'circle'
      },
      {
        data: this.analyze(BSC).NUR, label: 'NUR', backgroundColor: 'rgb(54, 162, 235)',
        yAxisID: 'yAxis', xAxisID: 'xAxis', maxBarThickness: 25,
        minBarLength: 10, borderColor: 'red', borderWidth: 1, borderRadius: 2, pointStyle: 'circle'
      },



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

    this.getMicrowaveNur(subSystem);
    this.subsystemChartLabels = this.analyze(subSystem).chartLabels;

    this.subsystemChartData = [

      { data: this.analyze(subSystem).NUR, label: 'NUR' },
    ],
      this.subsystemChartOptions = {

        plugins: {
          legend: {
            position: 'left',
            title: {
              display: true,
              color: 'blue',
              text:`Total NUR ${this.NUR}`

            }
          }

        },
        responsive: true

      }

  }
  private getUserData() {
    this._AuthServices.currentUser.subscribe(() => {
      if(this._AuthServices.currentUser.getValue()!=null)
      this.token = this._AuthServices.currentUser.getValue();
    })
  }


  public downloadNur() {
    let filename = "Nur.xlsx";
    this._NURService.downloadNur({ 'filename': filename }, this.NURIndex,this.token).subscribe((data) => {
      console.log(data);
      saveAs(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), filename)

    });

  }
  private getTimeSpan() {

    this.timeSpan = this.statestics.time_span;
    this.generateMonths(this.timeSpan);

  }
  private getVIP()
  {
    this.VIPs=this.statestics.vip;

  }
  private analyzeGenerator() {

    let genStatestics: any = this.statestics.Generator_statestic;
    if (genStatestics == null) {
      this.isGenStatestics = false;

    }
    else {
      let vendors: any[] = [];
      let count_tickets: any[] = [];
      let NUR: any[] = [];
      this.isGenStatestics = true;
      this.totalGenTicketsCount = genStatestics.No_Gen_tickets;
      this.totalGenTicketsNUR = genStatestics.total_Gen_Nur;
      let ET_Tickets = genStatestics.count_ET_Gen_tickets;
      if (ET_Tickets != 0) {
        vendors.push('ET');
        count_tickets.push(ET_Tickets);
        NUR.push(genStatestics.total_ET_Gen_Nur);
        this.topETGenTicket = genStatestics.top_ET_Nur_tickets;
      }
      let VF_Tickets = genStatestics.count_VF_Gen_tickets;
      if (VF_Tickets != 0) {
        vendors.push('VF');
        count_tickets.push(VF_Tickets);
        NUR.push(genStatestics.total_VF_Gen_Nur);
        this.topVFGenTicket = genStatestics.top_VF_Nur_tickets;
      }
      let OG_Tickets = genStatestics.count_OG_Gen_tickets;
      if (OG_Tickets != 0) {
        vendors.push('OG');
        count_tickets.push(OG_Tickets);
        NUR.push(genStatestics.total_OG_Gen_Nur);
        this.topOGGenTicket = genStatestics.top_OG_Nur_tickets;
      }
      let Rent_Tickets = genStatestics.count_Rent_Gen_tickets;
      if (Rent_Tickets != 0) {
        vendors.push('Rent');
        count_tickets.push(Rent_Tickets);
        NUR.push(genStatestics.total_Rent_Gen_Nur);
        this.topRentGenTicket = genStatestics.top_Rent_Nur_tickets;
      }
      this.genChartLabels = vendors;
      this.genChartData = [{
        data: count_tickets, label: 'Number of tickets', backgroundColor: 'orange',
        yAxisID: 'yAxis', xAxisID: 'xAxis', maxBarThickness: 25,
        minBarLength: 10, borderColor: 'red', borderWidth: 1, borderRadius: 2, pointStyle: 'circle'
      },
      {
        data: NUR, label: 'NUR', backgroundColor: 'rgb(54, 162, 235)',
        yAxisID: 'yAxis', xAxisID: 'xAxis', maxBarThickness: 25,
        minBarLength: 10, borderColor: 'red', borderWidth: 1, borderRadius: 2, pointStyle: 'circle'
      }
      ]




    }
  }

  private getAvgTicketDur() {
    this.avgTicketDur = this.statestics.average_tickets_duration

  }

  private getRepeatedSites()
  {
    this.repeatedSites=this.statestics.repeated_sites;
  }
  private getNURIndex()
  {
    this._NURService.NURIndex.subscribe(()=>{
      if( this._NURService.NURIndex.getValue()!=null)
      {
        this.NURIndex=this._NURService.NURIndex.getValue();
        console.log(this.NURIndex);

      }
    })
  }

  private getTopSitesNUR()
  {
    this.topSitesNUR=this.statestics.top_sites_nur
  }

  private getNURStatestics() {
    this.getTimeSpan();
    this.getTotalNUR();
    this.getTotalTickets();
    this.getAvgTicketDur();
    this.analyzeBSC();
    this.analyzeSubsystem();
    this.analyzeGenerator();
    this.getVIP();
    this.getRepeatedSites();
    this.getTopSitesNUR();

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

    this. getUserData();
    this.getNUR();
    this.getNURIndex();

  }

}
