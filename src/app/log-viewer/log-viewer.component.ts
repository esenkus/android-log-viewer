import { Component, Input } from '@angular/core';
import { LogLine } from './domain/Interfaces';
import { LogViewerService } from './log-viewer.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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

  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 3, rows: 1, color: '#DDBDF1' }
  ];
}
