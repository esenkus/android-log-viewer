import { NgModule } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { LogAreaComponent } from './log-area/log-area.component';

@NgModule({
  declarations: [LogViewerComponent, LogAreaComponent],
  imports: [MatGridListModule, MatButtonModule],
  exports: [LogViewerComponent]
})
export class LogViewerModule { }
