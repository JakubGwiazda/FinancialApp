import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GetAppSettingsResponse, SettingValueType } from 'crypto-api/model';
import { DynamicTableComponent } from 'src/app/common/components/dynamic-table/dynamic-table.component';
import { IColumnDefinition, ITableDefinition } from 'src/app/common/interfaces/IColumnConfig';

export interface  ISettingsTableData{
  id: number,
  name: string,
  value: string,
  valueType: SettingValueType
}

@Component({
  selector: 'app-settings-table',
  template: '<app-dynamic-table [tableData]="settingsTable"></app-dynamic-table>',
  styleUrl: './settings-table.component.scss',
  standalone: false,
})
export class SettingsTableComponent extends DynamicTableComponent<ISettingsTableData> implements OnInit, OnChanges{
  @Input() data!: ISettingsTableData[];

  settingsTableColumns : IColumnDefinition[] = [{
        columnDef:'name',
        header: 'Name', 
        width: '50px',
        editable: false,
        cell: (item: GetAppSettingsResponse) => `${item?.name}`
      },
      {
        columnDef:'value',
        header: 'Settings value',
        width: '50px',
        editable: true,
        cell: (item: GetAppSettingsResponse) => `${item?.value}`
      }];

  settingsTable: ITableDefinition<ISettingsTableData> = {
    columns: this.settingsTableColumns,
    dataSource: [],
    displayedColumns: this.settingsTableColumns.map(p => p.columnDef),
    dataType: 'AppSettings'
  }

  ngOnInit(): void {
    this.settingsTable.dataSource = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.settingsTable.dataSource = this.data;
    }
  }
}
