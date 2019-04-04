import {ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from 'app/core/module-import-guard';
import {BookTrackerErrorHandlerService} from './book-tracker-error-handler.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  
 }
