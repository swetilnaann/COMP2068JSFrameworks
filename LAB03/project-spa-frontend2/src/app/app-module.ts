import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Project } from './project/project';
//Import HTTP client module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';
//import the project service dso we can inject it into the component
import { ProjectService } from './services/project'

@NgModule({
  declarations: [
    App,
    Project
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [Project]
})
export class AppModule { }
