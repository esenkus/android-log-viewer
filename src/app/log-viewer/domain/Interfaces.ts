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
}
