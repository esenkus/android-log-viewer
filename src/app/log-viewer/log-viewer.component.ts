import { Component, Input } from '@angular/core';
import { LogLevel, LogLine } from './domain/Interfaces';
import { LogViewerService } from './log-viewer.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
  providers: [LogViewerService]
})
export class LogViewerComponent {
  selectedLogLevels: string[] = [];
  selectedLogKeys: string[] = [];
  keyFilterInputText: string;
  valueFilterInputText: string;
  logLines: LogLine[] = [];

  // Pass data to log-filters
  logLevelsList = Object.values(LogLevel).filter(v => isNaN(Number(v)));
  logKeyList: string[] = ['test1', 'test2'];

  // Receive data from log-filters

  constructor(private service: LogViewerService) {}

  @Input()
  public set rawLogLines(log: string[]) {
    log.map(line => {
      this.logLines.push(this.service.logFromString(line));
    });
  }

  updateLogLevelFilter(value: string) {
    if (!this.selectedLogLevels.includes(value)) {
      this.selectedLogLevels.push(value);
    } else {
      this.selectedLogLevels = this.selectedLogLevels.filter(e => e !== value);
    }
  }

  updateKeyFilterSearchText(value: string) {
    console.log(value);
    this.keyFilterInputText = value;
  }

  updateLogKeyFilter(value: string) {
    console.log(value);
    if (!this.selectedLogKeys.includes(value)) {
      this.selectedLogKeys.push(value);
    } else {
      this.selectedLogKeys = this.selectedLogKeys.filter(e => e !== value);
    }
  }

  updateValueFilterSearchText(value: string) {
    console.log(value);
    this.valueFilterInputText = value;
  }
}
