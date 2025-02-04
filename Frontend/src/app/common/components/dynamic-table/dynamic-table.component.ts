import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ITableDefinition } from '../../interfaces/IColumnConfig';

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
          <button mat-button (click)="onActionClick(row)">Akcja</button>
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
  @Output() itemAction = new EventEmitter<T>();

  onActionClick(item: T) {
    this.itemAction.emit(item)
  }
}
