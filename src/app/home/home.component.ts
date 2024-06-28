/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rawLogLines: string[] = [
    '--------- beginning of system',
    '02-20 17:08:25.631   765   795 V BackupManagerService: Finishing install immediately',
    "02-20 17:08:25.633   566  2961 E         : Couldn't opendir /data/app/vmdl689267385.tmp: No such file or directory",
    '02-20 17:08:25.633   566  2961 E installd: Failed to delete /data/app/vmdl689267385.tmp: No such file or directory',
    '02-20 17:08:25.654  2993  2993 I GsaVoiceInteractionSrv: (REDACTED) O received %s',
    '02-20 17:08:25.658  5795  5795 E Blog    : [2] vju.f(6): msg: "%s - Received: %s, %s" args: [[Ljava.lang.Object;@3ab1e33]',
    "02-20 17:08:25.658  5795  5795 E Blog    : com.google.android.flib.log.WhatATerribleException: java.util.MissingFormatArgumentException: Format specifier '%s'",
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at agyk.i(PG:2)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at agyk.a(PG:2)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at agyk.f(Unknown Source:0)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at com.google.android.finsky.utils.FinskyLog.f(PG:2)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at vju.f(Unknown Source:6)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at vkb.k(Unknown Source:129)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at vkb.g(PG:14)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at vjz.onReceive(Unknown Source:3)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.app.LoadedApk$ReceiverDispatcher$Args.lambda$-android_app_LoadedApk$ReceiverDispatcher$Args_52497(LoadedApk.java:1313)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.app.-$Lambda$aS31cHIhRx41653CMnd4gZqshIQ.$m$7(Unknown Source:4)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.app.-$Lambda$aS31cHIhRx41653CMnd4gZqshIQ.run(Unknown Source:39)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.os.Handler.handleCallback(Handler.java:790)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.os.Handler.dispatchMessage(Handler.java:99)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.os.Looper.loop(Looper.java:164)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at android.app.ActivityThread.main(ActivityThread.java:6494)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at java.lang.reflect.Method.invoke(Native Method)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)',
    "02-20 17:08:25.658  5795  5795 E Blog    : Caused by: java.util.MissingFormatArgumentException: Format specifier '%s'",
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at java.util.Formatter.format(Formatter.java:2522)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at java.util.Formatter.format(Formatter.java:2458)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at java.lang.String.format(String.java:2814)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	at agyk.a(PG:1)',
    '02-20 17:08:25.658  5795  5795 E Blog    : 	... 16 more',
    '02-20 17:08:25.660  4337  4337 D Finsky  : [2] vkd.f(0): vkd - Received: android.intent.action.PACKAGE_ADDED, [xSkJPfp4XfoOjFI9kmxgIoSF4MFXO3YGYb3aquEug18]',
    '02-20 17:08:25.666   765   765 W ResourceType: For resource 0x7f1512e6, entry index(4838) is beyond type entryCount(2628)',
    '02-20 17:08:25.670   765   765 W ResourceType: For resource 0x7f150adb, entry index(2779) is beyond type entryCount(2628)',
    '02-20 17:08:25.674   765   911 I InputReader: Reconfiguring input devices.  changes=0x00000010',
    '02-20 17:08:25.674   765   765 W ResourceType: For resource 0x7f150d91, entry index(3473) is beyond type entryCount(2628)'
  ];

  additionalLogLine: string;
  logInputText: string;
  showLogInputDialog = false;

  savedFiltersFormControl = new FormControl(false);
  textInputFormControl = new FormControl('');
  savedFilters = '';

  constructor(private router: Router) {
    this.savedFiltersFormControl.valueChanges.subscribe(value => {
      this.savedFilters = value ? this.textInputFormControl.value : '';
    });

    this.textInputFormControl.valueChanges.subscribe(value => {
      localStorage.setItem('savedFilters', value);
      if (!this.savedFiltersFormControl.value) {
        return;
      }
      this.savedFilters = value;
    });
  }

  ngOnInit(): void {
    this.textInputFormControl.setValue(localStorage.getItem('savedFilters'));
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        this.additionalLogLine = `02-20 17:08:37.988  6294  6299 I zygote64: After code cache collection, code=176KB, data=${i}KB`;
      }, i * 2000);
    }
  }

  public loadLogFromFile() {
    document.querySelector('input').click();
  }

  public openLogInputDialog() {
    this.showLogInputDialog = true;
  }

  public closeLogInputDialog() {
    this.showLogInputDialog = false;
  }

  public loadLogFromInputDialog() {
    this.showLogInputDialog = false;
    if (this.logInputText.length === 0) {
      return;
    }
    // in case the log was copied from the viewer itself
    const untabbedLines = this.logInputText
      .trim()
      .replace(new RegExp('\t', 'g'), ' ');
    this.rawLogLines = untabbedLines.split('\n');
    this.logInputText = '';
  }

  public fileSelected(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const fileContent = (fileReader.result as string).trim().split('\n');
      this.rawLogLines = fileContent;
    };
    fileReader.readAsText(file);
  }
}
