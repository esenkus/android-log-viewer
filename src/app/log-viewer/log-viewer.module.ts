import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { LogViewerComponent } from '../log-viewer/log-viewer.component';
import { FiltersComponent } from '../filters/filters.component';

// Material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LogAreaComponent } from './log-area/log-area.component';

@NgModule({
  declarations: [LogViewerComponent, FiltersComponent, LogAreaComponent],
  imports: [
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [CommonModule, SharedModule, LogViewerComponent, FiltersComponent]
})
export class LogViewerModule {}
