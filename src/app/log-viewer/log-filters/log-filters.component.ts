import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-log-filters',
  templateUrl: './log-filters.component.html',
  styleUrls: ['./log-filters.component.scss']
})
export class LogFiltersComponent {
  @Input() dropdownName = '';
  @Input() inputName = '';

  @Input() optionsList = [];
  @Output() dropDownItemEvent = new EventEmitter<string>();

  @Output() inputFieldEvent = new EventEmitter<string>();

  // @Input() beverage = 'Tea';
  @Output() newBeverageEvent = new EventEmitter<string>();

  dropDownFormControl = new FormControl('');
  textInputFormControl = new FormControl();

  logLevelsList: string[] = this.optionsList;
  searchPhrase: string[] = [];

  updateDropDownSelection(value: string) {
    this.dropDownItemEvent.emit(value);
  }

  updateInputFieldText(value: string) {
    this.inputFieldEvent.emit(value);
  }
}
