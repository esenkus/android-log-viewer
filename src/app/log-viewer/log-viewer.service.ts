import { Injectable } from '@angular/core';
import { LogLevel, LogLine } from './domain/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class LogViewerService {
  constructor() {}

  public logFromString(log: string): LogLine {
    try {
      return this.tryToParseLogLine(log);
    } catch (ex) {
      const logLevel = LogLevel.assert;
      return {
        date: '00-00',
        time: '00:00:00.000',
        mainProcessId: 9999,
        workerProcessId: 9999,
        logLevel,
        logKey: 'ParserError',
        logMessage: 'Failed to parse a log line: ' + log,
        color: this.getColorFromLogLevel(logLevel),
        logLevelString: this.logLevelToString(logLevel)
      };
    }
  }

  public shouldLogLineBeShown(
    logLine: LogLine,
    logLevelFilters: Set<LogLevel>,
    keyFilters: Set<string>,
    priorityKeyFilters: string[] = [],
    valueFilter: string = ''
  ): boolean {
    if (!logLevelFilters.has(logLine.logLevel)) {
      return false;
    }
    if (priorityKeyFilters.length) {
      const contains = priorityKeyFilters
        .filter(priorityKeyFilter => priorityKeyFilter.length)
        .map(priorityKeyFilter => priorityKeyFilter.toLowerCase())
        .some(priorityKeyFilter =>
          logLine.logKey.toLowerCase().includes(priorityKeyFilter)
        );
      if (!contains) {
        return false;
      }
    }
    // skip simple key filters if priority ones are defined
    // TODO: think if it's worth doing so
    if (!priorityKeyFilters.length) {
      if (!keyFilters.has(logLine.logKey)) {
        return false;
      }
    }
    if (
      valueFilter.length &&
      !logLine.logMessage.toLowerCase().includes(valueFilter.toLowerCase())
    ) {
      return false;
    }

    return true;
  }

  private tryToParseLogLine(log: string): LogLine {
    if (log.startsWith('---') || log.startsWith('  ')) {
      const customMessageLogLevel = LogLevel.info;
      return {
        date: '00-00',
        time: '00:00:00.000',
        mainProcessId: 9999,
        workerProcessId: 9999,
        logLevel: customMessageLogLevel,
        logKey: 'AndroidRuntime',
        logMessage: log,
        color: this.getColorFromLogLevel(customMessageLogLevel),
        logLevelString: this.logLevelToString(customMessageLogLevel)
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
    const logMessageStartIndex = splitLog[6] === ':' ? 7 : 6;
    const logMessage = splitLog
      .slice(logMessageStartIndex)
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
      case LogLevel.error:
      case LogLevel.assert:
        return 'red';
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
