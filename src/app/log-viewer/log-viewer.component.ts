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

  constructor(private service: LogViewerService) {}

  @Input()
  public set rawLogLines(log: string[]) {
    log.map(line => {
      this.allLogLines.push(this.service.logFromString(line));
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
}
