import { Injectable } from '@angular/core';
import { LogLevel, LogLine } from './domain/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class LogViewerService {
  constructor() {}

  public logFromString(log: string): LogLine {
    if (log.startsWith('---') || log.startsWith('  ')) {
      return {
        date: '1990-01-01',
        time: '00:00',
        mainProcessId: 0,
        workerProcessId: 123,
        logLevel: LogLevel.info,
        logKey: 'AndroidRuntime',
        logMessage: log,
        color: this.getColorFromLogLevel(LogLevel.info),
        logLevelString: this.logLevelToString(LogLevel.info)
      };
    }

    const splitLog = log.split(' ').filter(line => line.length > 0);
    const date = splitLog[0];
    const time = splitLog[1];
    const possibleBothProcessesIds = splitLog[2];
    let mainProcessId: number;
    let workerProcessId: number;
    let logLevel: LogLevel;
    let logKey: string;
    if (possibleBothProcessesIds.includes('-')) {
      mainProcessId = +possibleBothProcessesIds.split('-')[0];
      workerProcessId = +possibleBothProcessesIds.split('-')[1];
      const levelKey = splitLog[3].split('/');
      logLevel = this.getLogLevel(levelKey[0]);
      logKey = levelKey[1];
    } else if (possibleBothProcessesIds.endsWith(':')) {
      // no processId, straight to logLevel and key
      logLevel = this.getLogLevel(
        possibleBothProcessesIds.substring(
          0,
          possibleBothProcessesIds.length - 1
        )
      );
      logKey = splitLog[3];
    } else {
      mainProcessId = +possibleBothProcessesIds;
      workerProcessId = +splitLog[3];
      logLevel = this.getLogLevel(splitLog[4]);
      logKey = splitLog[5].replace(':', '');
    }
    const logMessage = splitLog
      .slice(6)
      .join(' ')
      .trim();
    return {
      date,
      time,
      mainProcessId,
      workerProcessId,
      logLevel,
      logKey,
      logMessage,
      color: this.getColorFromLogLevel(logLevel),
      logLevelString: this.logLevelToString(logLevel)
    };
  }

  private getColorFromLogLevel(logLevel: LogLevel): string {
    switch (logLevel) {
      case LogLevel.debug:
        return 'cyan';
      case LogLevel.info:
        return 'greenyellow';
      case LogLevel.verbose:
        return 'orange';
      case LogLevel.warning:
        return 'brown';
      case LogLevel.error:
        return 'red';
      case LogLevel.assert:
        return 'darkred';
    }
  }

  private getLogLevel(logLevel: string): LogLevel {
    switch (logLevel) {
      case 'V':
      case 'VERBOSE':
        return LogLevel.verbose;
      case 'D':
      case 'DEBUG':
        return LogLevel.debug;
      case 'I':
      case 'INFO':
        return LogLevel.info;
      case 'W':
      case 'WARN':
        return LogLevel.warning;
      case 'E':
      case 'ERROR':
      case 'F': // this one's weird, but seen in wild
        return LogLevel.error;
      case 'A':
      case 'ASSERT':
        return LogLevel.assert;
      default:
        throw new Error(`Failed to parse log level: ${logLevel}`);
    }
  }

  private logLevelToString(logLevel: LogLevel): string {
    switch (logLevel) {
      case LogLevel.debug:
        return 'D';
      case LogLevel.info:
        return 'I';
      case LogLevel.verbose:
        return 'V';
      case LogLevel.warning:
        return 'W';
      case LogLevel.error:
        return 'E';
      case LogLevel.assert:
        return 'A';
    }
  }
}
