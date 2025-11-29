import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponent } from './project/project';
//Import HTTP client module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';
//import the project service dso we can inject it into the component
import { ProjectService } from './services/project'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, ProjectComponent],
  imports: [
    // list of modules that are required by the app
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // list of services that are required by the app
    ProjectService,
  ],
  bootstrap: [ProjectComponent],
})
export class AppModule { }
