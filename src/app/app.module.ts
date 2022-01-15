import {  HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    HomeComponent,
    SearchResultsComponent,
    SiteDetailsComponent,
    LoadingScreenComponent,
    UserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, NgxPaginationModule, NgxTypedJsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
