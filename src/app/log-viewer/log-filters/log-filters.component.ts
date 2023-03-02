import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxItem } from '../domain/Interfaces';

@Component({
  selector: 'app-log-filters',
  templateUrl: './log-filters.component.html',
  styleUrls: ['./log-filters.component.scss']
})
export class LogFiltersComponent {
  @Input() dropdownName = '';
  @Input() inputName = '';

  @Output() dropDownItemEvent = new EventEmitter<string>();

  @Output() inputFieldEvent = new EventEmitter<string>();
  @Output() allCheckboxChangedEvent = new EventEmitter<boolean>();

  textInputFormControl = new FormControl();
  dropDownSearchFormControl = new FormControl('');
  checkboxItems: CheckboxItem[] = [];

  searchPhrase: string[] = [];

  @Input()
  public set optionsList(options: string[]) {
    this.checkboxItems = options.map(option => ({
      text: option,
      checked: true
    }));
  }

  @Input()
  public set optionUncheckedExternally(option: string) {
    this.checkboxItems
      .filter(checkboxItem => checkboxItem.text === option)
      .forEach(checkboxItem => (checkboxItem.checked = false));
  }

  public updateDropDownSelection(event: CheckboxItem) {
    event.checked = !event.checked;
    console.log(this.checkboxItems);
    this.dropDownItemEvent.emit(event.text);
  }

  public updateInputFieldText(event) {
    this.inputFieldEvent.emit(event.target.value);
  }

  public shouldBeShown(option) {
    return option
      .toLowerCase()
      .includes(this.dropDownSearchFormControl.value.toLowerCase());
  }

  public markAllCheckboxes(value: boolean) {
    this.checkboxItems.forEach(checkboxItem => {
      checkboxItem.checked = value;
    });
    this.allCheckboxChangedEvent.emit(value);
  }
}
