import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent {
  logLevels = new FormControl('');

  logLevelsList: string[] = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
}
