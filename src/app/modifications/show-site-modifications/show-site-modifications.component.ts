import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/sites/sites.service';
import { ModificationsService } from '../modifications.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-show-site-modifications',
  templateUrl: './show-site-modifications.component.html',
  styleUrls: ['./show-site-modifications.component.scss']
})
export class ShowSiteModificationsComponent implements OnInit {
  public nodalCode:any="";
  public nodalName:any="";
  public site:any;
  public site_id:any;


  constructor(private _siteService:SitesService,private _ModificationsServices:ModificationsService ) { }

  private getSite() {
    this._siteService.site.subscribe(() => {
      this.site = this._siteService.site.getValue();
      console.log(this.site);
      this.site_id = this.site[0].id
      this.nodalCode=this.site[0].site_Code;
      this.nodalName=this.site[0].site_name;
    })
  }

  private getSiteModifications()
  {

  }
  public downloadsites()
  {
    let filename="allSites.xlsx";
    this._ModificationsServices.download({'filename':filename}).subscribe((data)=>{
      console.log(data);
      saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),filename)

    });

  }

  ngOnInit(): void {
    this.getSite();
  }

}
