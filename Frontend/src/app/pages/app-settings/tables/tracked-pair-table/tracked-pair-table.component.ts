import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GetTrackedCryptoResponse } from 'crypto-api/model/financial';
import { DynamicTableComponent } from 'src/app/pages/common/components/dynamic-table/dynamic-table.component';
import { IColumnDefinition, ITableDefinition, OperationKind } from 'src/app/pages/common/interfaces/IColumnConfig';
import { ITrackedPairs } from 'src/app/pages/common/interfaces/ITrackedPairs';

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
    header: '',
    editable: false,
    width: '10vw',
    actions:[
      {
        label:'Delete',
        operationKind: OperationKind.Remove,
        icon: 'assets/icons/remove.svg'
      },
      {
        label:'Update',
        operationKind: OperationKind.Update,
        icon: 'assets/icons/edit.svg'
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
