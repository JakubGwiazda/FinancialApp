import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GetAppSettingsResponse, SettingValueType } from 'crypto-api/model';
import { DynamicTableComponent } from 'src/app/common/components/dynamic-table/dynamic-table.component';
import { IColumnDefinition, ITableDefinition, OperationKind } from 'src/app/common/interfaces/IColumnConfig';

export interface  ISettingsTableData{
  id: number,
  name: string,
  value: string,
  valueType: SettingValueType,
  description: string,
}

@Component({
  selector: 'app-settings-table',
  template: '<app-dynamic-table [tableData]="settingsTable" (itemAction)="forwardItemAction($event)"></app-dynamic-table>',
  styleUrl: './settings-table.component.scss',
  standalone: false,
})
export class SettingsTableComponent extends DynamicTableComponent<ISettingsTableData> implements OnInit, OnChanges{
  @Input() data!: ISettingsTableData[];
  @Output() action = new EventEmitter<{ item: ISettingsTableData, operationKind: OperationKind, dataType: string }>();

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
      },
      {
        columnDef:'description',
        header: 'Description',
        width: '200px',
        editable: true,
        cell: (item: GetAppSettingsResponse) => `${item?.description}`
      },
      {
          columnDef:'action',
          header: 'Action',
          editable: false,
          actions:[
            {
              label:'Update',
              operationKind: OperationKind.Update
            }
          ]
        },
    ];

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

  forwardItemAction(event: { item: ISettingsTableData, operationKind: OperationKind, dataType: string }) {
    this.action.emit(event);
  }
}
