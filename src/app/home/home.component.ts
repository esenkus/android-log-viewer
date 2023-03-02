/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rawLogLines: string[] = [
    '02-20 17:08:37.907  6294  6309 W SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [App Aware] Emulator Detection Guard - Emulator check instance 1 non-tamper action event added to App Aware report',
    '02-20 17:08:37.910  6294  6309 I SECUREDEX-TEST: EMULATOR DETECTION called - NONTAMPER',
    '02-20 17:08:37.910  6294  6309 I SECUREDEX-TEST: EMULATOR DETECTION tamperCount: 0 NonTamperCount: 1',
    '02-20 17:08:37.912  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection Started.',
    '02-20 17:08:37.947  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #1 Started.',
    '02-20 17:08:37.987  6294  6299 I zygote64: Do full code cache collection, code=224KB, data=197KB',
    '02-20 17:08:37.988  6294  6299 I zygote64: After code cache collection, code=176KB, data=121KB',
    '02-20 17:08:38.204  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #1 Completed in 257 ms',
    '02-20 17:08:38.206  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Started.',
    '02-20 17:08:38.226  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Completed in 21 ms',
    '02-20 17:08:38.227  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Started.',
    '02-20 17:08:38.232  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Completed in 5 ms',
    '02-20 17:08:38.233  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Started.',
    '02-20 17:08:38.258  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Completed in 25 ms',
    '02-20 17:08:38.259  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Started.',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Completed in 78 ms',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #7 Started.',
    '02-20 17:08:38.360  6294  6299 I zygote64: Compiler allocated 4MB to compile int ei.VF.Yc(int, ei.Iz)',
    '02-20 17:08:38.388  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #7 Completed in 49 ms',
    '02-20 17:08:38.388  6294  6309 I SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection No dynamic instrumentation detected. Non-tamper action called.',
    '02-20 17:08:38.391  6294  6299 I zygote64: Do partial code cache collection, code=213KB, data=150KB',
    '02-20 17:08:38.392  6294  6299 I zygote64: After code cache collection, code=213KB, data=150KB',
    '02-20 17:08:38.392  6294  6299 I zygote64: Increasing code cache capacity to 1024KB',
    '02-20 17:08:38.392  6294  6309 W SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [App Aware] Dynamic Instrumentation Detection Guard - DID Check NonTamper non-tamper action event added to App Aware report',
    '02-20 17:08:38.395  6294  6309 I SECUREDEX-TEST: DID called - NONTAMPER',
    '02-20 17:08:38.395  6294  6309 I SECUREDEX-TEST: DID tamperCount: 0 NonTamperCount: 1',
    '02-20 17:08:38.396  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection Completed in 483 ms',
    '02-20 17:08:38.525  6294  6299 I zygote64: Compiler allocated 15MB to compile java.lang.String ei.xc.toString()',
    '02-20 17:08:38.632  6294  6299 I zygote64: Compiler allocated 14MB to compile void ei.iz.zc()',
    '02-20 17:08:38.785  6294  6299 I zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()zygote64: Compiler allocated 17MB to compile void ei.WF.Yc()',
    '02-20 17:08:39.190  6294  6309 W SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [App Aware] Root Detection Guard - rootDetection instance 1 non-tamper action event added to App Aware report',
    '02-20 17:08:39.193  6294  6309 I SECUREDEX-TEST: ROOT DETECTION called - NONTAMPER',
    '02-20 17:08:39.193  6294  6309 I SECUREDEX-TEST: ROOT DETECTION tamperCount: 0 NonTamperCount: 1]',
    '02-20 17:08:40.365  6294  6309  I  SECUREDEX-TEST:          RESOURCE VERIFICATION tamperCount: 0 NonTamperCount: 1',
    '02-20 17:09:01.320  6294  6309  E  TestRunner:              failed: testSupportMatrix(com.arxan.testapp.SupportMatrixTest)',
    '02-20 17:09:01.320  6294  6309  E  TestRunner:              ----- begin exception -----',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              java.lang.AssertionError: Malicious Package Detection did not trigger Tamper or NonTamper action during sync. Failing test',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at org.junit.Assert.fail(Assert.java:89)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at com.arxan.testapp.TestUtils.testGuardAction(TestUtils.java:42)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at com.arxan.testapp.SupportMatrixTest.testSupportMatrix(SupportMatrixTest.java:31)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at java.lang.reflect.Method.invoke(Native Method)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:59)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:56)',
    '02-20 17:09:01.325  6294  6309  E  TestRunner:              at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)',
    '02-20 17:08:38.204  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #1 Completed in 257 ms',
    '02-20 17:08:38.206  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Started.',
    '02-20 17:08:38.226  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Completed in 21 ms',
    '02-20 17:08:38.227  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Started.',
    '02-20 17:08:38.232  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Completed in 5 ms',
    '02-20 17:08:38.233  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Started.',
    '02-20 17:08:38.258  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Completed in 25 ms',
    '02-20 17:08:38.259  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Started.',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Completed in 78 ms',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #7 Started.',
    '02-20 17:08:38.204  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #1 Completed in 257 ms',
    '02-20 17:08:38.206  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Started.',
    '02-20 17:08:38.226  6294  6309 A SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #3 Completed in 21 ms',
    '02-20 17:08:38.227  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Started.',
    '02-20 17:08:38.232  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #4 Completed in 5 ms',
    '02-20 17:08:38.233  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Started.',
    '02-20 17:08:38.258  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #5 Completed in 25 ms',
    '02-20 17:08:38.259  6294  6309 V SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Started.',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #6 Completed in 78 ms',
    '02-20 17:08:38.338  6294  6309 D SECUREDEX: [Instr: androidx.test.runner.AndroidJUnitRunner] [DID Check NonTamper] Dynamic Instrumentation Detection - Frida Detection #7 Started.'
  ];

  additionalLogLine: string;
  logInputText: string;
  showLogInputDialog = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('HomeComponent INIT');

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
