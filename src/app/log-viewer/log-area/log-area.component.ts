import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {
  ContextMenuAction,
  ContextMenuItem,
  LogLine
} from '../domain/Interfaces';

@Component({
  selector: 'app-log-area',
  templateUrl: './log-area.component.html',
  styleUrls: ['./log-area.component.scss']
})
export class LogAreaComponent {
  @Input()
  logLines: LogLine[];

  @Output() additionalLogKeyExcludeEvent = new EventEmitter<string>();

  contextMenuItems: ContextMenuItem[] = [];
  showContextMenu = false;
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  @HostListener('document:click')
  public documentClick(): void {
    this.showContextMenu = false;
  }

  public contextMenuItemSelected(contextMenuItem: ContextMenuItem) {
    switch (contextMenuItem.action) {
      case ContextMenuAction.excludeKey:
        const logLine = contextMenuItem.data as LogLine;
        this.additionalLogKeyExcludeEvent.emit(logLine.logKey);
    }
  }

  public displayContextMenu(event, logLine: LogLine) {
    this.showContextMenu = true;

    this.contextMenuItems = [
      {
        action: ContextMenuAction.excludeKey,
        text: `Filter out '${logLine.logKey}' log key`,
        data: logLine
      }
    ];

    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;
  }

  public getContextMenuStyle() {
    return {
      position: 'fixed',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'z-index': 2,
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    };
  }
}
