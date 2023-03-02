export enum LogLevel {
  verbose,
  debug,
  info,
  warning,
  error,
  assert
}

export interface LogLine {
  date: string;
  time: string;
  mainProcessId?: number;
  workerProcessId?: number;
  logLevel: LogLevel;
  logKey: string;
  logMessage: string;
  color: string;
  logLevelString: string;
}

export enum ContextMenuAction {
  excludeKey
}

export interface ContextMenuItem {
  action: ContextMenuAction;
  text: string;
  data: any;
}

export interface CheckboxItem {
  text: string;
  checked: boolean;
}
