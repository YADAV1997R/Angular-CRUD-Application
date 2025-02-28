import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ErrorHandler, Injectable } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  

  @Injectable()
  export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any) {
      console.error('Global Error:', error);
    }
  }
  