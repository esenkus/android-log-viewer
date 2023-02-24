import { NgModule } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LogAreaComponent } from './log-area/log-area.component';

@NgModule({
  declarations: [LogViewerComponent, LogAreaComponent],
  imports: [MatGridListModule, MatButtonModule],
  exports: [CommonModule, SharedModule, LogViewerComponent]
})
export class LogViewerModule {}
