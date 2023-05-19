# Android log viewer

![App-sample](app-sample.png)
Android Log viewer is a tool used to load existing android log files and view them with a bit of power on your hands.
It is written in Typescript using Electron + Angular using [angular-electron](https://github.com/maximegris/angular-electron) as a base project

## Features are

- Filter logs by level/ log key/ log message content
- Colored and aligned log view
- Load logs from file or clipboard
- Ability to easily exclude log key by right clicking on the log line
- Simple search in log lines (only working in browser mode for now)

## Features to add

- Finish search support for desktop mode
- Add persistant/global key excludes for always irrelevant log keys
- Allow opening file using this app (Open with...)
- Add latest Android Studio log parsing
- Add real time log viewing from device
- Show/ hide specific columns of logs (like date, processId and etc.)
- Refactor core log view module to be an angular library (potential to add to other angular projects)
- Add more styles
