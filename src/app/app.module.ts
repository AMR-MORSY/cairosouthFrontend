import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { StatesticsComponent } from './statestics/statestics.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpInterceptorService } from './http-interceptor.service';
import {NgChartsModule} from 'ng2-charts';
import { SharedModuleModule } from './shared-module/shared-module.module';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoadingScreenComponent,
    StatesticsComponent,
    FooterComponent,
    NotFoundComponent,



  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgChartsModule,
SharedModuleModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule, NgxPaginationModule, NgxTypedJsModule, BrowserAnimationsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
