import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  ContextMenuAction,
  ContextMenuItem,
  LogLine,
  SearchLine,
  SearchLineType
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
  @ViewChild('searchBox') public searchBox: ElementRef;

  contextMenuItems: ContextMenuItem[] = [];
  showContextMenu = false;
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  searchBarVisible = false;
  searchText: string;
  searchMatches: SearchLine[] = [];
  activeSearchMatchIndex: number;

  @HostListener('document:click')
  public documentClick(): void {
    this.showContextMenu = false;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.ctrlKey && event.key === 'f') {
      this.searchBarVisible = true;
      // need delay for focus to work, probably something with UI changing
      setTimeout(() => {
        this.searchBox.nativeElement.focus();
      }, 100);
    } else if (event.key === 'Escape') {
      this.hideSearch();
      this.clearSearch();
    }
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

  public hideSearch() {
    this.searchText = '';
    this.searchBarVisible = false;
  }

  public clearSearch() {
    this.searchMatches = [];
    for (let i = 0; i < this.logLines.length; i++) {
      const logMessage = this.logLines[i].logMessage;
      this.clearSearchPart(i, logMessage, 'message');
      const logKey = this.logLines[i].logKey;
      this.clearSearchPart(i, logKey, 'key');
    }
  }

  public clearSearchPart(row: number, logText: string, name: string) {
    for (let j = 0; j < logText.length; j++) {
      const span = document.getElementById(`log-column-${name}-${row}-${j}`);
      span.style.backgroundColor = '';
      span.style.opacity = '1';
    }
  }

  public doSearchInLinePart(
    searchText: string,
    row: number,
    type: SearchLineType,
    logText: string
  ) {
    const matches: SearchLine[] = [];
    let position = 0;
    while (
      logText.includes(searchText, position) &&
      position < logText.length
    ) {
      const matchPosition = logText.indexOf(searchText, position);
      position = matchPosition + searchText.length;
      matches.push({
        row,
        type,
        start: matchPosition,
        end: position
      });
    }
    return matches;
  }

  public doSearch(event) {
    this.clearSearch();
    const searchText = event.target.value.toLowerCase();
    if (!searchText) {
      return;
    }
    for (let i = 0; i < this.logLines.length; i++) {
      const logMessage = this.logLines[i].logMessage.toLowerCase();
      const messageMatches = this.doSearchInLinePart(
        searchText,
        i,
        SearchLineType.message,
        logMessage
      );
      const logKey = this.logLines[i].logKey.toLowerCase();
      const keyMatches = this.doSearchInLinePart(
        searchText,
        i,
        SearchLineType.key,
        logKey
      );
      this.searchMatches = this.searchMatches.concat(
        keyMatches,
        messageMatches
      );
    }
    console.log(this.searchMatches.length);
    if (this.searchMatches.length > 0) {
      console.log(`set active as ${this.searchMatches[0].row}`);
      this.activeSearchMatchIndex = 0;
    }
    this.highlightResults();
  }

  public highlightResults() {
    for (const match of this.searchMatches) {
      const isActive =
        match === this.searchMatches[this.activeSearchMatchIndex];
      for (let i = match.start; i < match.end; i++) {
        const span = document.getElementById(
          `log-column-${match.type}-${match.row}-${i}`
        );
        span.style.backgroundColor = 'yellowgreen';
        span.style.opacity = isActive ? '0.75' : '1';
        if (isActive) {
          console.log(
            `scroll to view for active index: ${this.activeSearchMatchIndex}`
          );
          console.log(match);
          span.scrollIntoView();
        }
      }
    }
  }

  public nextSearchResult() {
    this.activeSearchMatchIndex++;
    if (this.activeSearchMatchIndex > this.searchMatches.length - 1) {
      this.activeSearchMatchIndex = 0;
    }
    this.highlightResults();
  }

  public previousSearchResult() {
    this.activeSearchMatchIndex--;
    if (this.activeSearchMatchIndex < 0) {
      this.activeSearchMatchIndex = this.searchMatches.length - 1;
    }
    this.highlightResults();
  }

  public searchKeydown(event) {
    if (event.shiftKey && event.key === 'Enter') {
      this.previousSearchResult();
    } else if (event.key === 'Enter') {
      this.nextSearchResult();
    } else if (event.key === 'Escape') {
      this.hideSearch();
      this.clearSearch();
    }
  }
}
