import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {GpsService} from './gps.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AppRootingModule } from './/app-rooting.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRootingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [GpsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
