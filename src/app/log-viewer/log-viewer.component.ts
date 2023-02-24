import { Component, Input } from '@angular/core';
import { LogLine } from './domain/Interfaces';
import { LogViewerService } from './log-viewer.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
  providers: [LogViewerService]
})
export class LogViewerComponent {
  logLines: LogLine[] = [];

  constructor(private service: LogViewerService) {}

  @Input()
  public set rawLogLines(log: string[]) {
    log.map(line => {
      this.logLines.push(this.service.logFromString(line));
    });
  }
}
