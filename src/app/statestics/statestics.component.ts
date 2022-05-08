
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { SitesService } from '../sites/sites.service';
import { Chart } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-user',
  templateUrl: './statestics.component.html',
  styleUrls: ['./statestics.component.scss']
})
export class StatesticsComponent implements OnInit {

  public token: any;


  public chartPlugins = [pluginDataLabels.default]
  public BSCChartType: any = 'bar';
  public BSCChartOptions = {
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
      datalabels: {
        color: 'black'
      },
      title: {
        display: true,
        text: 'BSC Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public BSCChartLegend = true;
  public BSCChartData: any;
  public BSCChartLabels: any;


  public RNCChartType: any = 'bar';
  public RNCChartOptions = {
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
      title: {
        display: true,
        text: 'RNC Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public RNCChartLegend = true;
  public RNCChartData: any;
  public RNCChartLabels: any;


  public categoryChartType: any = 'bar';
  public categoryChartOptions = {
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
      title: {
        display: true,
        text: 'category Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public categoryChartLegend = true;
  public categoryChartData: any;
  public categoryChartLabels: any;

  public sites_severityChartType: any = 'bar';
  public sites_severityChartOptions = {
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
      title: {
        display: true,
        text: 'Severity Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public sites_severityChartLegend = true;
  public sites_severityChartData: any;
  public sites_severityChartLabels: any;


  public sites_typesChartType: any = 'bar';
  public sites_typesChartOptions = {
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
      title: {
        display: true,
        text: 'Site Type Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public sites_typesChartLegend = true;
  public sites_typesChartData: any;
  public sites_typesChartLabels: any;


  public officesChartType: any = 'bar';
  public officesChartOptions = {

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
        position: 'top',
        align:'center',
        title:{
          display:true,
          color:'blue',
          text:'hello'
        }
      },
      title: {
        display: true,
        text: 'Offices Analysis',
        align: 'center',
        color: 'red',
        font: { weight: 'bold' }
      }
    },
    responsive: true
  };
  public officesChartLegend = true;
  public officesChartData: any;
  public officesChartLabels: any;





  constructor(private _AuthService: AuthenticationService, private _siteServices: SitesService, private _Router: Router) { }


  private getUserData() {
    if (this._AuthService.currentUser.getValue() != null) {
      this.token = this._AuthService.currentUser.getValue();
    }
    else {
      this._Router.navigate(['/home']);
    }

  }

  private getLAbels_Values(data: any) {
    let Labels: any[] = [];
    let Values: any[] = [];
    for (var i = 0; i < data.length; i++) {
      Labels.push(data[i][0]);
      Values.push(data[i][1]);
    }

    let details = {};

    return details = {
      'labels': Labels,
      'values': Values
    }

  }

  private show_BSC_RNC_Details(BSC: any) {

    let BSCs: any[] = [];

    for (var i = 0; i < BSC.length - 10; i++) {
      BSCs.push(BSC[i])

    }
    BSCs.push(BSC[12])
    BSCs.push(BSC[14])

    this.BSCChartLabels = this.getLAbels_Values(BSCs).labels;
    this.BSCChartData = [{
      data: this.getLAbels_Values(BSCs).values, label: 'No.Sites', backgroundColor: '#FF6600', yAxisID: 'yAxis',

      maxBarThickness: 25,
      minBarLength: 10
    }];

    let RNCs: any[] = [];

    for (var i = 5; i < BSC.length - 3; i++) {
      RNCs.push(BSC[i])
    }
    RNCs.push(BSC[13])

    this.RNCChartLabels = this.getLAbels_Values(RNCs).labels;
    console.log(this.getLAbels_Values(RNCs).values)
    this.RNCChartData = [{
      data: this.getLAbels_Values(RNCs).values, label: 'No.Sites', backgroundColor: '#FF6600', maxBarThickness: 25,
      minBarLength: 10
    }];
  }


  private showCategoriesDetails(sites_categories: any) {
    this.categoryChartLabels = Object.keys(sites_categories);
    this.categoryChartData = [{
      data: Object.values(sites_categories), label: 'No.Sites', backgroundColor: '#ff6600', yAxisID: 'yAxis', maxBarThickness: 25,
      minBarLength: 10
    }]

  }

  private showSiteSeverityDetails(sites_severity: any) {
    this.sites_severityChartLabels = Object.keys(sites_severity);
    this.sites_severityChartData = [{
      data: Object.values(sites_severity), label: 'No.Sites', backgroundColor: '#ff6600', yAxisID: 'yAxis', maxBarThickness: 25,
      minBarLength: 10
    }]
  }

  private showSiteTypeDetails(sites_types: any) {
    this.sites_typesChartLabels = Object.keys(sites_types);
    this.sites_typesChartData = [{
      data: Object.values(sites_types), label: 'No.Sites', backgroundColor: '#ff6600', yAxisID: 'yAxis', maxBarThickness: 25,
      minBarLength: 10
    }]

  }

  private showOfficesDetails(offices: any) {
    this.officesChartLabels = Object.keys(offices);
    this.officesChartData = [{
      data: Object.values(offices), label: 'No.Sites', backgroundColor: '#ff6600',
       yAxisID: 'yAxis', xAxisID: 'xAxis', maxBarThickness: 25,
      minBarLength: 10, borderColor: 'red',borderWidth:1,borderRadius:2,pointStyle:'circle'
    }]

  }

  public getSitesStatestics() {
    this._siteServices.showStatistics(this.token).subscribe((response: any) => {
      console.log(response)
      if (response.message == "token expired, please login") {
        alert("token expired, please login");
        this._Router.navigate(['/auth/login']);
      }
      else if (response.message == 'success') {
        this.show_BSC_RNC_Details(Object.entries(response.BSCs));
        this.showCategoriesDetails(response.sites_categories);
        this.showSiteSeverityDetails(response.sites_severity);
        this.showSiteTypeDetails(response.sites_types);
        this.showOfficesDetails(response.offices);

      }

    });

  }



  ngOnInit(): void {
    this.getUserData();
    this.getSitesStatestics()


  }










}
