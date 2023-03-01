import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuAction, ContextMenuItem } from '../domain/Interfaces';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems: ContextMenuItem[] = [];

  @Output() contextMenuItemSelectedEvent = new EventEmitter<ContextMenuItem>();

  public contextMenuItemSelected(contextMenuItem: ContextMenuItem) {
    this.contextMenuItemSelectedEvent.emit(contextMenuItem);
  }
}
