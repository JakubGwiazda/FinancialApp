import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GetTrackedCryptoResponse } from 'crypto-api/model';
import { DynamicTableComponent } from 'src/app/common/components/dynamic-table/dynamic-table.component';
import { IColumnDefinition, ITableDefinition, OperationKind } from 'src/app/common/interfaces/IColumnConfig';
import { ITrackedPairs } from 'src/app/common/interfaces/ITrackedPairs';

@Component({
  selector: 'app-tracked-pair-table',
  template: '<app-dynamic-table [tableData]="trackedCryptoTable" (itemAction)="forwardItemAction($event)"></app-dynamic-table>',
  styleUrl: './tracked-pair-table.component.scss',
  standalone: false
})
export class TrackedPairTableComponent  extends DynamicTableComponent<ITrackedPairs> implements OnInit, OnChanges{
  @Input() data!: ITrackedPairs[];
  @Output() action = new EventEmitter<{ item: ITrackedPairs, operationKind: OperationKind, dataType: string }>();

  trackedCryptoTableColumns : IColumnDefinition[] = [{
    columnDef:'name',
    header: 'Name', 
    editable: true,
    cell: (item: GetTrackedCryptoResponse) => `${item?.cryptoCurrencySymbol}`
  },    
  {
    columnDef:'currency',
    header: 'Currency',
    editable: true,
    cell: (item: GetTrackedCryptoResponse) => `${item?.fiatCurrencySymbol}`
  },
  {
    columnDef:'collectData',
    header: 'Collect data',
    editable: true,
    cell: (item: GetTrackedCryptoResponse) => `${item?.collectData}`
  },
  {
    columnDef:'action',
    header: 'Action',
    editable: false,
    width: '10vw',
    actions:[
      {
        label:'Delete',
        operationKind: OperationKind.Remove
      },
      {
        label:'Update',
        operationKind: OperationKind.Update
      }
    ]
  },
];

trackedCryptoTable: ITableDefinition<ITrackedPairs> = {
  columns: this.trackedCryptoTableColumns,
  dataSource: [],
  displayedColumns: this.trackedCryptoTableColumns.map(p => p.columnDef),
  dataType: 'TrackedCrypto'
}

ngOnInit(): void {
  this.trackedCryptoTable.dataSource = this.data;
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && changes['data'].currentValue) {
    this.trackedCryptoTable.dataSource = this.data;
  }
}

forwardItemAction(event: { item: ITrackedPairs, operationKind: OperationKind, dataType: string }) {
  this.action.emit(event);
}
}
