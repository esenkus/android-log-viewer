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

  possibleLogLevelValues: string[] = Object.values(LogLevel)
    .filter(v => isNaN(Number(v)))
    .map(v => '' + v);
  selectedLogLevels: Set<LogLevel> = new Set(
    this.possibleLogLevelValues.map(v => LogLevel[v])
  );

  possibleLogKeyValues: string[] = [];
  selectedLogKeys: Set<string> = new Set();
  priorityKeyFilters: string[] = [];
  lastManuallyExcludedLogKey: string;

  valueFilter: string;

  constructor(private service: LogViewerService) {}

  @Input()
  public set rawLogLines(log: string[]) {
    this.allLogLines = [];
    log
      .filter(line => line.length !== 0)
      .map(line => {
        this.allLogLines.push(this.service.logFromString(line));
      });
    this.selectedLogKeys = new Set(
      this.allLogLines.map(logLine => logLine.logKey)
    );
    this.possibleLogKeyValues = Array.from(
      this.selectedLogKeys.values()
    ).sort();
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

  public updateLogLevelFilter(value: string) {
    const logLevel = LogLevel[value];
    if (!this.selectedLogLevels.has(logLevel)) {
      this.selectedLogLevels.add(logLevel);
    } else {
      this.selectedLogLevels.delete(logLevel);
    }
    this.reapplyAllFilters();
  }

  public updateKeyFilterSearchText(value: string) {
    this.priorityKeyFilters = value ? value.split(' ') : [];
    this.reapplyAllFilters();
  }

  public updateLogKeyFilter(value: string) {
    if (!this.selectedLogKeys.has(value)) {
      this.selectedLogKeys.add(value);
    } else {
      this.selectedLogKeys.delete(value);
    }
    this.reapplyAllFilters();
  }

  public updateLogValueFilter(value: string) {
    this.valueFilter = value;
    this.reapplyAllFilters();
  }

  public logKeyExcluded(event: string) {
    this.selectedLogKeys.delete(event);
    this.lastManuallyExcludedLogKey = event;
    this.reapplyAllFilters();
  }

  public allLogLevelsSelected(event: boolean) {
    if (event) {
      this.selectedLogLevels = new Set(
        this.possibleLogLevelValues.map(v => LogLevel[v])
      );
    } else {
      this.selectedLogLevels.clear();
    }
    this.reapplyAllFilters();
  }

  public allLogKeysSelected(event: boolean) {
    if (event) {
      this.selectedLogKeys = new Set(this.possibleLogKeyValues);
    } else {
      this.selectedLogKeys.clear();
    }
    this.reapplyAllFilters();
  }

  private reapplyAllFilters() {
    this.filteredLogLines = [];
    console.log('reapplying filters:');
    console.log(this.selectedLogLevels);
    console.log(this.selectedLogKeys);
    console.log(this.priorityKeyFilters);
    console.log(this.valueFilter);
    this.allLogLines.forEach(logLine =>
      this.checkAndApplyLogLineFilter(logLine)
    );
  }

  private checkAndApplyLogLineFilter(logLine: LogLine) {
    if (
      this.service.shouldLogLineBeShown(
        logLine,
        this.selectedLogLevels,
        this.selectedLogKeys,
        this.priorityKeyFilters,
        this.valueFilter
      )
    ) {
      this.filteredLogLines.push(logLine);
    }
  }
}
