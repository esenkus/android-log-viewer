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
  allLogLines: LogLine[] = [];
  filteredLogLines: LogLine[] = [];
  logLevelFilters: LogLevel[] = [
    LogLevel.assert,
    LogLevel.debug,
    LogLevel.error,
    LogLevel.info,
    LogLevel.verbose,
    LogLevel.warning
  ];
  selectedLogLevels: string[] = [];
  selectedLogKeys: string[] = [];
  keyFilterInputText: string;
  valueFilterInputText: string;
  logLines: LogLine[] = [];

  // Pass data to log-filters
  logLevelsList = Object.values(LogLevel).filter(v => isNaN(Number(v)));
  logKeyList = new Set();

  // Receive data from log-filters

  constructor(private service: LogViewerService) {}

  @Input()
  public set rawLogLines(log: string[]) {
    log.map(line => {
      const logLine = this.service.logFromString(line);
      this.allLogLines.push(logLine);
      this.logKeyList.add(logLine.logKey);
    });
    this.reapplyAllFilters();
  }

  @Input()
  public set additionalLogLine(log: string) {
    if (!log) {
      return;
    }
    // TODO: for the future, somehow handle scrolling in child component
    const logLine = this.service.logFromString(log);
    this.allLogLines.push(logLine);
    this.checkAndApplyLogLineFilter(logLine);
  }

  private reapplyAllFilters() {
    this.allLogLines.forEach(logLine =>
      this.checkAndApplyLogLineFilter(logLine)
    );
  }

  private checkAndApplyLogLineFilter(logLine: LogLine) {
    if (this.service.shouldLogLineBeShown(logLine, this.logLevelFilters, [])) {
      this.filteredLogLines.push(logLine);
    }
  }

  private updateLogLevelFilter(value: string) {
    console.log(value);
    if (!this.selectedLogLevels.includes(value)) {
      this.selectedLogLevels.push(value);
    } else {
      this.selectedLogLevels = this.selectedLogLevels.filter(e => e !== value);
    }
  }

  private updateKeyFilterSearchText(value: string) {
    console.log(value);

    this.keyFilterInputText = value;
  }

  private updateLogKeyFilter(value: string) {
    console.log(value);

    if (!this.selectedLogKeys.includes(value)) {
      this.selectedLogKeys.push(value);
    } else {
      this.selectedLogKeys = this.selectedLogKeys.filter(e => e !== value);
    }
  }

  private updateValueFilterSearchText(value: string) {
    console.log(value);

    this.valueFilterInputText = value;
  }
}
