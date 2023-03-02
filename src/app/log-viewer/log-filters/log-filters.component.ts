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

  @Input() optionsList: string[] = [];
  @Output() dropDownItemEvent = new EventEmitter<string>();

  @Output() inputFieldEvent = new EventEmitter<string>();

  dropDownFormControl = new FormControl('');
  textInputFormControl = new FormControl();
  dropDownSearchFormControl = new FormControl('');

  checkboxEnabled: boolean | null = true;

  searchPhrase: string[] = [];

  public updateDropDownSelection(event) {
    this.dropDownItemEvent.emit(event);
  }

  public updateInputFieldText(event) {
    this.inputFieldEvent.emit(event.target.value);
  }

  public shouldBeShown(option) {
    return option
      .toLowerCase()
      .includes(this.dropDownSearchFormControl.value.toLowerCase());
  }

  public markAllCheckboxes(value) {
    this.checkboxEnabled = value ? true : null;
  }
}
