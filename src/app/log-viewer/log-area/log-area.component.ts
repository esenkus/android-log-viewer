import { Component, Input } from '@angular/core';
import { LogLine } from '../domain/Interfaces';

@Component({
  selector: 'app-log-area',
  templateUrl: './log-area.component.html',
  styleUrls: ['./log-area.component.scss']
})
export class LogAreaComponent {
  @Input()
  logLines: LogLine[];
}
