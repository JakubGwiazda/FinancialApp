import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ITableDefinition, OperationKind } from '../../interfaces/IColumnConfig';

@Component({
  selector: 'app-dynamic-table',
  template: `
<table mat-table [dataSource]="tableData.dataSource" >
  @for (column of tableData.columns; track column) {
    <ng-container [matColumnDef]="column.columnDef">
      <th mat-header-cell *matHeaderCellDef>
        {{column.header}}
      </th>
      <td mat-cell *matCellDef="let row">
        <ng-container *ngIf="column.cell; else actionButton">
          {{ column?.cell(row) }}
        </ng-container>
        <ng-template #actionButton>
            <button *ngFor="let action of column.actions" mat-button (click)="onActionClick(row, action.operationKind)">{{action.label}}</button>
        </ng-template>
      </td>      
    </ng-container>
  }
  <tr mat-header-row *matHeaderRowDef="tableData.displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: tableData.displayedColumns;"></tr>
  <tr class="mat-row" *matNoDataRow>
      <td class="mat-cell" colspan="4">No data matching the filter</td>
  </tr>
</table>
`,
  styleUrl: './dynamic-table.component.scss',
  standalone: false
})

export class DynamicTableComponent<T>{
  @Input() tableData!: ITableDefinition;
  @Output() itemAction = new EventEmitter<{ item: T, operationKind: OperationKind, dataType: string }>();

  onActionClick(item: T, operationKind: OperationKind) {
    this.itemAction.emit({item, operationKind, dataType: this.tableData.dataType})
  }
}
