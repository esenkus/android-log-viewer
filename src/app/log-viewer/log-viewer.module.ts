import { NgModule } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LogViewerComponent],
  imports: [MatGridListModule, MatButtonModule],
  exports: [LogViewerComponent]
})
export class LogViewerModule { }
